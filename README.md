# OSMQ PROJECT**

&nbsp;

#### **Dependencies :**

- python >= 3.6
- postgresql >= 10 (optinally)
- nodejs >= 12

&nbsp;

#### **1- Clone git repo :**

```

git clone https://192.168.0.53/aelketroussi/rna.git
cd OSMQ
```

&nbsp;

#### **2- Configuration :**

Eventually you can override the config.py file configuration by creating a new file server_rna\instance\config.py from server_rna\instance\config.py.template, and put in it your configuration for example your local database connection path or your local directories.

&nbsp;

#### **3- Install dependencies :**

```
cd OSMQ\server_osmq
python -m venv .venv # only for the first time
.venv\Scripts\activate
pip install -r requirements.txt
```

&nbsp;

#### **4- Run flask server :**

```
cd OSMQ\server_osmq
flask db upgrade   # only for the first time or after a git pull
load_data.bat # if you want to load initial data like codelist see "sql/" directory, WARNING this command is only used with postgresql db(you must include the link of the folder bin that it is located in postgre inside the environement variable PATH)
start.bat
```

&nbsp;

#### **5- Run vuejs server :**

```
cd OSMQ\vue_apps
npm install
npm run watch # See package.json and vue.config.js to understand where the vue html template is generated
```

&nbsp;

#### **6- Add initial data and create extentions:**

If you need to add initial data (database) then create your model and export your data in an sql file in the sqls/ directory (The sql file should be commited in git).
  
Create postgresql extentions:
```
create extension postgis;
```
&nbsp;

#### **7- Contribution :**

1- Sync your master branch with the remote repo And create your feature branch

```
git checkout master
git pull origin master
git checkout -b feat/#YOUR_BRANCH_NUMBER
```

2- Make your source code changes And add commit them\*\*

3- Again sync your master branch with the remote repo before the push

```
git checkout master
git pull origin master
```

4- If the branch master changed then you have to rebase your feature branch and resolve any conflicts

```
git rebase master feat/#YOUR_BRANCH_NUMBER
```

5- Push your feature branch

```
git push origin feat/#YOUR_BRANCH_NUMBER
```
