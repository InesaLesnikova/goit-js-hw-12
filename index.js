import{i,a as y,S as p}from"./assets/vendor-DsdExPLz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();i.settings({position:"topRight",iconColor:"#fff",messageColor:"#fff"});async function f(n,t=1,a=20){const r="https://pixabay.com/api/?key="+"49253518-6fbcd3e4502fdc6eae88c44f3"+"&q="+encodeURIComponent(n)+"&image_type=photo&orientation=horizontal&safesearch=true&page="+t+"&per_page="+a;try{if(n=="")throw new Error("Please enter something!");const o=await y.get(r);if(o.data.hits==0)throw new Error("Sorry, there are no images matching your search query. Please, try again!");return{urls:[...o.data.hits],total:o.data.totalHits}}catch(o){i.error({iconUrl:"img/error.svg",message:o.message})}}let b=new p(".gallery a");function h(n,t){let a=n.map(s=>`
      <li>
        <a href="${s.largeImageURL}"><img src="${s.webformatURL}" alt="${s.tags}" width="360" height="200" /></a>
        <table class="caption">
          <thead>
            <tr>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s.likes}</td>
              <td>${s.views}</td>
              <td>${s.comments}</td>
              <td>${s.downloads}</td>
            </tr>
          </tbody>
        </table>
      </li>`).join("");t.insertAdjacentHTML("beforeend",a),b.refresh()}const e={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loading"),moreImgBtn:document.getElementById("moreImgBtn"),request:document.querySelector(".form input"),submitBtn:document.querySelector(".form button")};e.form.addEventListener("submit",L);let l,d=20,u;async function L(n){n.preventDefault(),e.request.setAttribute("readonly",!0),e.submitBtn.disabled=!0,e.loader.classList.remove("hidden"),l=1,u=e.request.value.trim();const t=await f(u,l,d);if(e.request.removeAttribute("readonly"),e.submitBtn.disabled=!1,e.loader.classList.add("hidden"),!t||t.urls.length===0){e.gallery.innerHTML="",e.moreImgBtn.classList.add("hidden"),i.warning({position:"topRight",message:"No images found. Please try a different search query."});return}e.gallery.innerHTML="",e.request.value="",h(t.urls,e.gallery),g(t)}async function m(n){e.loader.classList.remove("hidden");const t=await f(u,++l,d);if(!t||t.urls.length===0){e.moreImgBtn.classList.add("hidden"),e.loader.classList.add("hidden"),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});return}const a=e.gallery.lastElementChild;if(h(t.urls,e.gallery),e.loader.classList.add("hidden"),g(t),a){const{top:s}=a.getBoundingClientRect();window.scrollBy({top:s-24,behavior:"smooth"})}}function g(n){!n||n.urls.length<d||n.total===l*d?(e.moreImgBtn.classList.add("hidden"),e.moreImgBtn.removeEventListener("click",m),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(e.moreImgBtn.classList.remove("hidden"),e.moreImgBtn.addEventListener("click",m))}
//# sourceMappingURL=index.js.map
