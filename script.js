$(document).ready(function(){
// GET
  var getAndDisplayAllTasks = function () {
      
    $.ajax({

      type: 'GET',

      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=108',

      dataType: 'json',

      success: function (response, textStatus) {
        $('#todo-list').empty();

        response.tasks.forEach(function (task) {

          $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        })
      },

      error: function (request, textStatus, errorMessage) {

        console.log(errorMessage);

      }

    });
  }
// POST
  var createTask = function () {

    $.ajax({

      type: 'POST',
    
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=108',
    
      contentType: 'application/json',
    
      dataType: 'json',
    
      data: JSON.stringify({
    
        task: {
    
          content: $('#new-task-content').val()
    
        }
    
      }),
    
      success: function (response, textStatus) {

        $('#new-task-content').val('');
        getAndDisplayActiveTasks();
    
      },
    
      error: function (request, textStatus, errorMessage) {
    
        console.log(errorMessage);
    
      }
    
    });
  }

  $('#create-task').on('click','.create' ,function (e) {

    e.preventDefault();
  
    createTask();
  
  });

  getAndDisplayActiveTasks();

// DELETE
  var deleteTask = function (id) {
    $.ajax({

      type: 'DELETE',
    
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=108',
    
      success: function (response, textStatus) {
        
          getAndDisplayActiveTasks(); 

      },
    
      error: function (request, textStatus, errorMessage) {
    
        console.log(errorMessage);
    
      }
    
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'))
  });

// Mark Complete
  var markTaskComplete = function (id) {
    $.ajax({

      type: 'PUT',
    
      url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id + '/mark_complete?api_key=108',
    
      dataType: 'json',
    
      success: function (response, textStatus) {
    
        getAndDisplayActiveTasks();
    
      },
    
      error: function (request, textStatus, errorMessage) {
    
        console.log(errorMessage);
    
      }
    
    });
  }

// Mark Active
  var markTaskActive = function (id) {

    $.ajax({

      type: 'PUT',

      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=108',

      dataType: 'json',

      success: function (response, textStatus) {

        getAndDisplayCompleteTasks();

      },

      error: function (request, textStatus, errorMessage) {

        console.log(errorMessage);

      }

    });

  }

  $(document).on('change', '.mark-complete', function () {

    if (this.checked) {

      markTaskComplete($(this).data('id'));
  
    } else {
  
      markTaskActive($(this).data('id'));
  
    }
  
  });

  // get All Tasks
  $(document).on('click', '.all', function (e) {
    e.preventDefault();
    getAndDisplayAllTasks();
    tab = 3;
  });

  // get Active Tasks
  $(document).on('click', '.active', function (e) {
    e.preventDefault();
    getAndDisplayActiveTasks();
    tab = 1;
  });

  // get Completed Tasks
  $(document).on('click', '.complete', function (e) {
    e.preventDefault();
    getAndDisplayCompleteTasks();
    tab = 2;
  });

});

var getAndDisplayActiveTasks = function () {
      
  $.ajax({

    type: 'GET',

    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=108',

    dataType: 'json',

    success: function (response, textStatus) {
      $('#todo-list').empty();
      
      response.tasks.forEach(function (task) {
        if ((JSON.parse(task.completed)) === false){
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        }
      })
    },

    error: function (request, textStatus, errorMessage) {

      console.log(errorMessage);

    }

  });
}

var getAndDisplayCompleteTasks = function () {
      
  $.ajax({

    type: 'GET',

    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=108',

    dataType: 'json',

    success: function (response, textStatus) {
      $('#todo-list').empty();
      
      response.tasks.forEach(function (task) {
        if ((JSON.parse(task.completed)) === true){
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        }
      })
    },

    error: function (request, textStatus, errorMessage) {

      console.log(errorMessage);

    }

  });
}
