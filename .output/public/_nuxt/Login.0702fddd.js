import{I as l,a7 as u,a8 as i,a9 as c,f as r,o as p,c as _,a as o,O as h}from"./entry.b5608eb4.js";const g=o("h1",null,"Login",-1),f=[g],m=o("h1",null,"Logout",-1),d=[m],v=l({__name:"Login",setup(k){const e=u(),s=i(),t=c();function a(){e.auth.signInWithPassword({email:"philipswiezak@gmail.com",password:"Slaphi123"})}function n(){e.auth.signOut({scope:"global"})}return r(()=>{console.log(s.value),s.value&&t.push("/tasks"),s.value==null&&t.push("/login")}),(b,w)=>(p(),_(h,null,[o("button",{onClick:a},f),o("button",{onClick:n},d)],64))}});export{v as default};
