"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQueryParams = exports.paginate = exports.toJSON = exports.generateRandomString = void 0;
const randomstring_1 = __importDefault(require("randomstring"));
const generateRandomString = (length = 8) => randomstring_1.default.generate(length);
exports.generateRandomString = generateRandomString;
/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */
const deleteAtPath = (obj, path, index) => {
    if (index === path.length - 1) {
        delete obj[path[index]];
        return;
    }
    deleteAtPath(obj[path[index]], path, index + 1);
};
const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, options) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    deleteAtPath(ret, path.split('.'), 0);
                }
            });
            ret.id = ret._id.toString();
            //@ts-ignore
            delete ret._id;
            delete ret.__v;
            delete ret.updatedAt;
            if (transform) {
                return transform(doc, ret, options);
            }
        },
    });
};
exports.toJSON = toJSON;
const paginate = (schema) => {
    /**
     * @typedef {Object} QueryResult
     * @property {Document[]} results - Results found
     * @property {number} page - Current page
     * @property {number} limit - Maximum number of results per page
     * @property {number} totalPages - Total number of pages
     * @property {number} totalResults - Total number of documents
     */
    /**
     * Query for documents with pagination
     * @param {Object} [filter] - Mongo filter
     * @param {Object} [options] - Query options
     * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @param {number} [options.page] - Current page (default = 1)
     * @returns {Promise<QueryResult>}
     */
    schema.statics.paginate = function (filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sort = '';
            if (options.sortBy) {
                const sortingCriteria = [];
                options.sortBy.split(',').forEach((sortOption) => {
                    const [key, order] = sortOption.split(':');
                    sortingCriteria.push((order === 'desc' ? '-' : '') + key);
                });
                sort = sortingCriteria.join(' ');
            }
            else {
                sort = 'createdAt';
            }
            const limit = options.limit && parseInt(options.limit, 10) > 0
                ? parseInt(options.limit, 10)
                : 10;
            const page = options.page && parseInt(options.page, 10) > 0
                ? parseInt(options.page, 10)
                : 1;
            const skip = (page - 1) * limit;
            const countPromise = this.countDocuments(filter).exec();
            let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);
            if (options.populate) {
                options.populate.split(',').forEach((populateOption) => {
                    docsPromise = docsPromise.populate(populateOption
                        .split('.')
                        .reverse()
                        .reduce((a, b) => ({ path: b, populate: a })));
                });
            }
            docsPromise = docsPromise.exec();
            return Promise.all([countPromise, docsPromise]).then((values) => {
                const [totalResults, results] = values;
                const totalPages = Math.ceil(totalResults / limit);
                const result = {
                    results,
                    page,
                    limit,
                    totalPages,
                    totalResults,
                };
                return Promise.resolve(result);
            });
        });
    };
};
exports.paginate = paginate;
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pickQueryParams = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
exports.pickQueryParams = pickQueryParams;
