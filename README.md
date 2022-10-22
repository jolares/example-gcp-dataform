# stackoverflow-data-reports
A BigQuery Dataform example project that transforms Stackoverflow public raw data into reporting tables in a BigQuery data warehouse.


## Project Layout


### Dataform configuration file


```
// dataform.json file
{
    // The GCP BigQuery dataset name (it should not include the GCP Project ID)
    "defaultSchema": "{GCP_BIGQUERY_DATASET_NAME}",
    "assertionSchema": "dataform_assertions",
    "warehouse": "bigquery",
    // The GCP Project ID
    "defaultDatabase": "{GCP_PROJECT_ID}"
    // Optional: the GCP Dataset Location (i.e. us-central-1, US, etc)
    "defaultLocation": "US"
}
```