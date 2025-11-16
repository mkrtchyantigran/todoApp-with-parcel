let t;var e="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);let o=new Uint8Array(16),a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));var n=function(n,r,l){if(e&&!r&&!n)return e();let s=(n=n||{}).random||(n.rng||function(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(o)})();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,r){l=l||0;for(let t=0;t<16;++t)r[l+t]=s[t];return r}return function(t,e=0){return a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]}(s)};window.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#form"),e=document.querySelector("#tasks-list"),o=document.querySelector("#completed-tasks"),a=document.querySelector("#all-tasks");function r(){e.innerHTML="",fetch("http://localhost:3333/tasks/").then(t=>t.json()).then(t=>{t.forEach(({id:t,task:o,isCompleted:a})=>{e.innerHTML+=`
            <div class="tasks-list_item">
              <label>
                <input type="checkbox" ${a?"checked":""} data-id=${t}>
                <h3>${o}</h3>
              </label>
              <button class='remove' data-id=${t} >Remove</button>
            </div>
          `}),document.querySelectorAll("input[type='checkbox']").forEach(t=>{t.addEventListener("change",t=>{let e=t.target.dataset.id;fetch(`http://localhost:3333/tasks/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({isCompleted:t.target.checked})}).then(()=>r()).catch(t=>console.log(t))})}),document.querySelectorAll(".remove").forEach(t=>{t.addEventListener("click",t=>{let e=t.target.dataset.id;fetch(`http://localhost:3333/tasks/${e}`,{method:"DELETE"}).then(()=>r()).catch(t=>console.log("Error",t))})}),a.textContent=t.length,o.textContent=t.filter(t=>t.isCompleted).length;let n=JSON.stringify(t.slice(-5));localStorage.setItem("array-item",n)}).catch(t=>{var n;alert("Server isn't available, Showing 5 latest todos",t),n=l(),e.innerHTML+="<h3 class='server-disabled-text' >server isn't available, Showing 5 latest Todos</h3>",n.forEach(({id:t,task:o,isCompleted:a})=>{e.innerHTML+=`
        <div class="tasks-list_item">
            <label>
                <input type="checkbox" ${a?"checked":""} data-id=${t} disabled>
            <h3>${o}</h3>
            </label>
          <button class='remove' data-id=${t} disabled >Remove</button>
        </div>
      `}),a.textContent=n.length,o.textContent=n.filter(t=>t.isCompleted).length})}function l(){let t=JSON.parse(localStorage.getItem("array-item"));return console.log(t),t}t.addEventListener("submit",t=>{t.preventDefault(),""!=t.target.task.value&&t.target.task.value.length>3?fetch("http://localhost:3333/tasks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:n(),task:t.target.task.value,isCompleted:!1})}).then(()=>r()).catch(t=>console.log("Error:",t)).finally(()=>t.target.reset()):alert("please type your task..")}),r(),l()});
//# sourceMappingURL=second Todo.fb5dbf8e.js.map
