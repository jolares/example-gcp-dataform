# stackoverflow-data-reports


- `data-reports-etl`: A project built with BigQuery Dataform that transforms Stackoverflow
  public raw data into reporting tables in a BigQuery data warehouse.

- `ETL`: A project built with BigQuery Dataform that transforms Stackoverflow
  public raw data into reporting tables in a BigQuery data warehouse.


## Local Development Environment Setup


- Clone the project workspace repository:
  `git clone https://github.com/jolares/stackoverflow-ai.git`

- Install project workspace node dependencies:
  `npm install`


#### (Optional) Install Recommended VSCode Extensions


- `dataform.dataform`: provides syntax highlighting, compilation, and intellisense
  for Dataform and SQLX projects. Refer to the [extension site](https://marketplace.visualstudio.com/items?itemName=dataform.dataform)



---



## GCP Project Configuration


### Setup Secrets


#### Create a Secret Token with Dataform Service Account Permissions


A secret token is created for the GCP _Dataform Service Account_ to interact with
Dataform resources.

- Enable GCP Secret Manager API for the GCP Project

- Open the GCP Secret Manager console and create a new secret token with any
  secure value of your preference.
  
  - This project named the secret token `GCP_BIGQUERY_DATAFORM_SA_TOKEN` 
  
- After the secret is created, edit the secret's _permissions_ and
  _grant access_ to the Dataform service account; for this, make the service
  account a new principal for the secret, and assign to it the role
  `Secret Manager Secret Accessor`

A secret token is created for the GCP _Dataform Service Account_ to interact with
Dataform resources.


#### Assign BigQuery Permissions to the Dataform Service Account


- Open the [Google Cloud AIM Admin console](https://console.cloud.google.com/iam-admin)

- Assign the role of `BigQuery Admin` to the dataform service account

- Edit the _Dataform Service Account_ created by Google by adding the _Role_
  `BigQuery Admin` to it.
  > Note: if you do not see the service account in the list of principals displayed
  > to you within the Permissions page, you probably need to enable/check the
  > option that indicates `Include Google-provided role grants`



---



## Project Folder Structure


```
stackoverflow-ai/
├── ...
├── definitions/
├   ├── reporting/
├   ├── sources/
├   ├── testing/
├── environments.json
├── schedules.json
└── package.json
```

### Dataform Dependencies


### Dataform Configuration File


```json
// dataform.json file
{
    // (Required) Set this value to the GCP BigQuery dataset name (the Dataset ID without
    // the GCP Project ID subdomain)
    "defaultSchema": "{GCP_BIGQUERY_DATASET_NAME}",
    // (Required)
    "assertionSchema": "dataform_assertions",
    // (Required)
    "warehouse": "bigquery",
    // (Required) Set this value to the GCP Project ID
    "defaultDatabase": "{GCP_PROJECT_ID}"
    // (Optional) Set this value the BigQuery Dataset Location (i.e. us-central-1, US)
    "defaultLocation": "US"
}
```


### Dataform Environments File


```json
{
  "environments": [
    {
      "name": "production",
      "configOverride": {},
      // The git repository branch, or commit SHA, that triggers the workflow
      // run using this environment (i.e. master, main, release, develop, etc)
      "gitRef": "master"
    },
    {
      "name": "development",
      "configOverride": {},
      "gitRef": "master"
    },
    {
      "name": "testing",
      "configOverride": {},
      "gitRef": "master"
    },

    // ... Other environments can be added here
  ]
}
```


### Dataform Schedules File


```json
{
  "schedules": [
    {
      "name": "daily",
      "options": {
        "includeDependencies": false,
        "fullRefresh": false,
        "tags": [
          "daily"
        ]
      },
      "cron": "00 09 * * *",
      "notification": {
        "onSuccess": false,
        "onFailure": false
      },
      "notifications": [
        {
          "events": [
            "failure"
          ],
          "channels": [
            "email jo"
          ]
        }
      ]
    }
  ],
  "notificationChannels": [
    {
      "name": "email jo",
      "email": {
        "to": [
          "jolares@gatech.edu"
        ]
      }
    }
  ]
}
```