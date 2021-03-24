// draw all tasks to the screen
function writeTasksToScreen(){
    // start by clearing the list
    $("[id=taskList]").empty();

    // for each task in the todo list...
    for(let i=0; i<tasks.length; i++){

        // shorthand for variables
        let id = tasks[i].task_id;
        let desc = tasks[i].task_desc;
        let comp = tasks[i].task_comp;

        // for each task, make an entry
        $("[id=taskList]").append(
            `<li class="list-group-item d-flex align-items-center text-break" id="${id}">
                <i class="mr-auto p-2">
                    ${desc}
                </i>
                
                <button type="button" class="btn btn-link p-2" onclick="completeTask(${id})">
                    <i class="fas fa-check" ></i>
                </button>
                <button type="button" class="btn btn-link p-2" data-toggle="modal" data-target="#editTaskModal" onclick="editModalHelper(${id})">
                    <i class="fas fa-edit" ></i>
                </button>
                <button type="button" class="btn btn-link p-2" data-toggle="modal" data-target="#deleteTaskModal" onclick="deleteModalHelper(${id})">
                    <i class="far fa-trash-alt"></i>
                </button>
            </li>`
        );

        // if the task is labeled complete, strike through it
        if(comp===true){
            $(`[id=${id}] i:first-child`).css( "text-decoration", "line-through");
        }else{
            $(`[id=${id}] i:first-child`).css( "text-decoration", "none");
        }
    }
}




/*
    methods for that perform API calls
*/

// get all tasks in the todo list
function getAllTasks(){
    $.ajax({
        url: '/tasks',
        type: 'GET',
        success: function(data) {
            tasks = data;
            writeTasksToScreen();
        }
    });
}

// add a task to the list
function addTask(){
    // create JSON object from the text in the modal
    let taskToAdd = JSON.stringify({
        task_desc: $("[id=newTaskTextArea]").val(),
        task_comp: false
    });

    // send the task to the database as post(create) request
    $.ajax({
        type: "POST",
        url: "/tasks",
        data: taskToAdd,
        contentType: "application/json",
        success: function(data){
            getAllTasks(); // refresh the tasks
        }
    });
}

// edit task
function editTask(id){
    // find the index for the task given its unique id 
    let index;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task_id===id){
            index = i;
        }
    }

    // create JSON object using newly edited task description
    let editedTask = JSON.stringify({
        task_id: tasks[index].task_id,
        task_desc: $("[id=editTaskTextArea]").val(),
        task_comp: tasks[index].task_comp
    });

    // send the task to the database as a put(update) request
    $.ajax({
        type: "PUT",
        url: `/tasks/${id}`,
        data: editedTask,
        contentType: "application/json",
        success: function(){
            getAllTasks(); // refresh the tasks
        }
    });
}

// delete task
function deleteTask(id){
    $.ajax({
        type: "DELETE",
        url: `/tasks/${id}`,
        success: function(){
            getAllTasks(); // refresh the tasks
        }
    });
}

// change the completion status of a given task
function completeTask(id){
    // find the index for the task given its unique id 
    let index;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task_id===id){
            index = i;
        }
    }

    // set completion status to the inverse
    tasks[index].task_comp = !tasks[index].task_comp;

    // using these methods updates the task, changing only the new completion status
    editModalHelper(id);
    editTask(id);
    
    getAllTasks(); // refresh the tasks
}




/*
    modal helper methods
*/
function editModalHelper(id){
    $("[id=editButton]").attr('onClick', `editTask(${id});`);
    $("[id=editTaskTextArea]").val($(`[id=${id}] i:first-child`).text().trim());
}
function deleteModalHelper(id){
    $("[id=deleteButton]").attr('onClick', `deleteTask(${id});`);
}
function clearNewTaskModal(){
    $("[id=newTaskTextArea]").val('');
}




/*
    on page intiation 
*/
let tasks = []; // initialize tasks array
getAllTasks(); // put tasks in tasks array

 