const PROJECT_ENV = process.env['PROJECT_ENV'] || 'development';

const GCP_PROJECT_ID = process.env['GCP_PROJECT_ID'];

const GCP_BUCKET_NAME = process.env['GCP_BUCKET_NAME'];

module.exports = {
    PROJECT_ENV,
    GCP_PROJECT_ID,
    GCP_BUCKET_NAME
};