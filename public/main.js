var completedTasks = document.querySelector('.completed');
var markComplete = document.getElementsByClassName('mark-complete');

var taskCompleted = function() {
    completedTasks.appendChild(this.parentElement);
    this.remove();
}

for (var i = 0; i < markComplete.length; i++) {
    markComplete[i].addEventListener('click', taskCompleted);
}
