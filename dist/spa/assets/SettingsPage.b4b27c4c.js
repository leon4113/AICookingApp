import{Q as c}from"./QInput.3a550fc5.js";import{c as P,a as _,h as q,d as v,l as k,M as u,N as w,O as r,V as i,P as a,X as p,ae as C,ag as I,af as Q,T as V,ah as b}from"./index.bd582081.js";import{Q as m,a as f}from"./QCard.f983a58c.js";import{Q as R,a as g}from"./QItem.65433f17.js";import{a as $,u as x}from"./use-dark.eb83277b.js";import{Q as B}from"./QPage.ff6a0c7c.js";import{a as l}from"./api.52e83815.js";import{_ as S}from"./plugin-vue_export-helper.21dcd24c.js";import"./uid.937d8ee7.js";import"./axios.bf56c3c5.js";var E=P({name:"QList",props:{...$,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:s}){const d=k(),h=x(e,d.proxy.$q),t=_(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(h.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>q(e.tag,{class:t.value},v(s.default))}});const U={data(){return{user:{id:null,username:"",email:"",password:""},passwords:{oldPassword:"",newPassword:""},pastRecipes:[]}},methods:{async fetchUserData(){try{const e=this.$q.localStorage.getItem("userId"),s=await l.get(`/user/${e}`);this.user=s.data}catch(e){console.error("Error fetching user data:",e)}},async updateProfile(){try{const e=await l.put(`/user/${this.user.id}`,{username:this.user.username});this.user=e.data,this.$q.notify({type:"positive",message:"Profile updated successfully!"})}catch(e){console.error("Error updating profile:",e)}},async changePassword(){try{const e=await l.put(`/user/${this.user.id}/change-password`,{oldPassword:this.passwords.oldPassword,newPassword:this.passwords.newPassword});this.$q.notify({type:"positive",message:e.data.message}),this.passwords.oldPassword="",this.passwords.newPassword=""}catch(e){console.error("Error changing password:",e),this.$q.notify({type:"negative",message:"Error changing password"})}},async fetchPastRecipes(){try{const e=this.$q.localStorage.getItem("userId"),s=await l.get(`/user/${e}/recipes`);this.pastRecipes=s.data.recipes}catch(e){console.error("Error fetching past recipes:",e)}},async deleteRecipe(e){try{const s=this.$q.localStorage.getItem("userId");await l.delete(`/user/${s}/recipes/${e}`),this.pastRecipes=this.pastRecipes.filter(d=>d.id!==e),this.$q.notify({type:"positive",message:"Recipe deleted successfully!"})}catch(s){console.error("Error deleting recipe:",s),this.$q.notify({type:"negative",message:"Error deleting recipe"})}}},created(){this.fetchUserData(),this.fetchPastRecipes()}},D={class:"q-pa-md"},N=i("div",{class:"text-h6"},"Profile Information",-1),L=i("div",{class:"text-h6"},"Change Password",-1),O=i("div",{class:"text-h6"},"Past Recipes",-1);function T(e,s,d,h,t,n){return u(),w(B,null,{default:r(()=>[i("div",D,[a(f,{class:"q-mb-md"},{default:r(()=>[a(m,null,{default:r(()=>[N,a(c,{modelValue:t.user.username,"onUpdate:modelValue":s[0]||(s[0]=o=>t.user.username=o),label:"Username"},null,8,["modelValue"]),a(p,{onClick:n.updateProfile,label:"Update Username",color:"primary",class:"q-mt-md"},null,8,["onClick"])]),_:1})]),_:1}),a(f,{class:"q-mb-md"},{default:r(()=>[a(m,null,{default:r(()=>[L,a(c,{modelValue:t.passwords.oldPassword,"onUpdate:modelValue":s[1]||(s[1]=o=>t.passwords.oldPassword=o),label:"Old Password",type:"password"},null,8,["modelValue"]),a(c,{modelValue:t.passwords.newPassword,"onUpdate:modelValue":s[2]||(s[2]=o=>t.passwords.newPassword=o),label:"New Password",type:"password"},null,8,["modelValue"]),a(p,{onClick:n.changePassword,label:"Change Password",color:"primary",class:"q-mt-md"},null,8,["onClick"])]),_:1})]),_:1}),a(f,null,{default:r(()=>[a(m,null,{default:r(()=>[O,a(E,{bordered:""},{default:r(()=>[(u(!0),C(Q,null,I(t.pastRecipes,(o,y)=>(u(),w(R,{key:y,clickable:""},{default:r(()=>[a(g,null,{default:r(()=>[V(b(o.title),1)]),_:2},1024),a(g,{side:""},{default:r(()=>[a(p,{icon:"delete",onClick:F=>n.deleteRecipe(o.id),color:"negative",flat:"",round:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])]),_:1})}var Y=S(U,[["render",T]]);export{Y as default};
