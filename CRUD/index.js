async function main() {
    const MongoClient = require("mongodb").MongoClient;

    let uri = "mongodb://localhost:27017";

    // Create Client Object
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listOfDatabases(client);
        
        // Create Project Types
        // await insertProjectType(client, "Emerson Project");
        // await insertProjectType(client, "ARTS Project");
        // await insertProjectType(client, "Home Project");
        // await insertProjectType(client, "FullStack Project");
        // await insertProjectType(client, "Private Project");
        // console.log("---------- Data Added ----------");

        // Create New Projects
        // await insertNewProject(client, "SmartEye 985","Gas Detector","Elisha Bartov");
        // await insertNewProject(client, "40/40D","Flame Detector","Elisha Bartov");
        // await insertNewProject(client, "30/30D","Flame Detector","Evgeny Ayzinberg");
        // await insertNewProject(client, "Resume","CV","Elisha Bartov");
        // await insertNewProject(client, "Chess Board","Chess Board","Elisha Bartov");
        // await insertNewProject(client, "Home Design","Home Designe Project","Renata Fayziev");
        // console.log("---------- Data Added ----------");

        // Create New Bugs
        // await insertNewBug(client, "RTC","RTC Not Work Properly","Elisha Bartov","Created");
        // await insertNewBug(client, "Flash Reading","Flash Reading Error","Daniel","Created");
        // console.log("---------- Data Added ----------");
        
        // Display Project Types
        await readProjectType(client, "Emerson Project");
        await readProjectType(client, "ARTS Project");
        await readProjectType(client, "Home Project");
        await readProjectType(client, "FullStack Project");
        await readProjectType(client, "Private Project");
        console.log("---------- End of Data ----------");

        // Display Projects
        await readProjectData(client, "SmartEye 985");
        await readProjectData(client, "40/40D");
        await readProjectData(client, "30/30D");
        await readProjectData(client, "Resume");
        await readProjectData(client, "Chess Board");
        await readProjectData(client, "Home Design");
        console.log("---------- End of Data ----------");

        // Display Project Bugs
        await readBug(client, "RTC");
        await readBug(client, "Flash Reading");
        console.log("---------- End of Data ----------");

        // Delete Projects
        // await deleteProjectType(client, "Emerson Project");
        // await deleteProjectType(client, "ARTS Project");
        // await deleteProjectType(client, "Home Project");
        // await deleteProjectType(client, "FullStack Project");
        // await deleteProjectType(client, "Private Project");
        // console.log("---------- Deleted Data ----------");

        // await deleteProject(client, "SmartEye 985");
        // await deleteProject(client, "40/40D");
        // await deleteProject(client, "30/30D");
        // await deleteProject(client, "Resume");
        // await deleteProject(client, "Chess Board");
        // await deleteProject(client, "Home Design");
        // console.log("---------- Deleted Data ----------");
    }
    catch (error) {
        console.log("Error"+error);
    }
    finally {
        client.close();
        console.log("Connection Closed");
    }
} 

main();

// Display All databases
async function listOfDatabases(client) {
    const dataBasesList = await client
    .db()
    .admin()
    .listDatabases();

    dataBasesList.databases.forEach(db => {
        console.log('DB Name: '+db.name);
    });
}

// CRUD (Create Read Update Delete)
// ------------------ Create ------------------
async function insertProjectType(client, projectType) {
    let type = new Object(
        {
            "projectType": projectType
        }
    );
    
    const result = await client
    .db("PMS")
    .collection("ProjectTypes")
    .insertOne(type);

    console.log(result);
}

async function insertNewProject(client, projectName, projectDesc, projectManager) {
    let project = new Object(
        {
            "projectName": projectName,
            "projectDescription": projectDesc,
            "projectManager": projectManager
        }
    );
    
    const result = await client
    .db("PMS")
    .collection("Projects")
    .insertOne(project);

    console.log(result);
}

async function insertNewBug(client, bugName, bugDesc, bugOwner, bugStatus) {
    let bug = new Object(
        {
            "bugName": bugName,
            "bugDescription": bugDesc,
            "bugOwner": bugOwner,
            "bugStatus": bugStatus            
        }
    );
    
    const result = await client
    .db("PMS")
    .collection("Bugs")
    .insertOne(bug);

    console.log(result);
}

// ------------------ Read ------------------
async function readProjectType(client,projectType) {
    const pType = await client
    .db("PMS")
    .collection("ProjectTypes")
    .findOne({
        "projectType": projectType
    });
    
    console.log(pType);
}

async function readProjectData(client,projectName) {
    const projectData = await client
    .db("PMS")
    .collection("Projects")
    .findOne({
        "projectName": projectName
    });
    
    console.log(projectData);
}

async function readBug(client,bugName) {
    const bug = await client
    .db("PMS")
    .collection("Bugs")
    .findOne({
        "bugName": bugName
    });
    
    console.log(bug);
}

// ------------------ Update ------------------
async function updateProjectData(client,project) {

}

// ------------------ Delete ------------------
async function deleteProjectType(client,projectType) {
    const response = await client
    .db("PMS")
    .collection("ProjectTypes")
    .deleteOne({
        "projectType": projectType
    });
    
    console.log(response);
}

async function deleteProject(client,projectName) {
    const response = await client
    .db("PMS")
    .collection("Projects")
    .deleteOne({
        "projectName": projectName
    });
    
    console.log(response);
}

async function deleteBug(client,bugName) {
    const response = await client
    .db("PMS")
    .collection("Bugs")
    .deleteOne({
        "bugName": bugName
    });
    
    console.log(response);
}