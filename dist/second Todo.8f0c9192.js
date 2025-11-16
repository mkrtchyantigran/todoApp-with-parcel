window.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#form');
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const payload = {
            id: "",
            task: e.target.value,
            isCompleted: false
        };
    });
});

//# sourceMappingURL=second Todo.8f0c9192.js.map
