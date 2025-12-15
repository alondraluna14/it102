document.addEventListener('DOMContentLoaded', () => {
    var taskInput = document.getElementById('task-input');
    var addTaskBtn = document.getElementById('add-task-btn');
    var taskList = document.getElementById('task-list');
    var emptyImage = document.querySelector('.empty-image');
    var todosContainer = document.querySelector('.todos-container');
    var progressBar = document.getElementById('progress');
    var progressNumbers = document.getElementById('numbers');
    var toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length === 0 ? '100%' : '50%';
    };

    var updateProgress = (checkCompletion = true) => {
        var totalTasks = taskList.children.length;
        var completedTasks = taskList.querySelectorAll('.checkbox:checked').length;


        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
            Confetti();
        }
    };

    var saveTasksToLocalStorage = () => {
        var tasks = Array.from(taskList.querySelectorAll('li')).map(li =>({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    var loadTasksFromLocalStorage = () => {
        var savedTasks = JSON.parse(localStorage.getItem('tasks')) ||[];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmptyState();
        updateProgress();
    };
  
    var addTask = (text, completed = false,
        checkCompletion = true
    ) => {
        var tasktext = text || taskInput.value.trim();
        if(!tasktext) { return; }

        var li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${tasktext}</span>
        <div class="task-buttons">
         <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button></div>
         `;
        
        var checkbox = li.querySelector('.checkbox');
        var editBtn = li.querySelector('.edit-btn');
        var deleteBtn = li.querySelector('.delete-btn');

        if(completed){
           li.classList.add('completed');
            if (editBtn) {
                editBtn.disabled = true;
                editBtn.style.opacity = 0.5;
                editBtn.style.pointerEvents = 'none';
            }
            if (checkbox) {
                checkbox.checked = true;
            }
        }

        
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                var isChecked = checkbox.checked;
                li.classList.toggle('completed', isChecked);
                if (editBtn) {
                    editBtn.disabled = isChecked;
                    editBtn.style.opacity = isChecked ? 0.5 : 1;
                    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
                    updateProgress();
                    saveTasksToLocalStorage();
                }
            });
        }



        
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                if (!checkbox || !checkbox.checked) {
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    toggleEmptyState();
                    updateProgress(false);
                    saveTasksToLocalStorage();
                }
            });
        }



       
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                li.remove();
                toggleEmptyState();
                updateProgress();
                saveTasksToLocalStorage();
            });
        }

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTasksToLocalStorage();
    };

    addTaskBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            addTask();
        }
    });

    loadTasksFromLocalStorage();

});


const Confetti = () => {
var count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}