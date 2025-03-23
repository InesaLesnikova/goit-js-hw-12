import{a as y,S as p,i}from"./assets/vendor-DsdExPLz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();async function h(t,r=1,a=20){const o="https://pixabay.com/api/?key="+"49253518-6fbcd3e4502fdc6eae88c44f3"+"&q="+encodeURIComponent(t)+"&image_type=photo&orientation=horizontal&safesearch=true&page="+r+"&per_page="+a;if(!t.trim())return Promise.reject(new Error("Please enter something!"));try{const s=await y.get(o);return s.data.hits.length===0?Promise.reject(new Error("Sorry, no images match your search query. Try again!")):{urls:s.data.hits,total:s.data.totalHits}}catch{return Promise.reject(new Error("An error occurred while fetching images. Try again later!"))}}let b=new p(".gallery a");function g(t,r){let a=t.map(n=>`
      <li>
        <a href="${n.largeImageURL}"><img src="${n.webformatURL}" alt="${n.tags}" width="360" height="200" /></a>
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
              <td>${n.likes}</td>
              <td>${n.views}</td>
              <td>${n.comments}</td>
              <td>${n.downloads}</td>
            </tr>
          </tbody>
        </table>
      </li>`).join("");r.insertAdjacentHTML("beforeend",a),b.refresh()}const e={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loading"),moreImgBtn:document.getElementById("moreImgBtn"),request:document.querySelector(".form input"),submitBtn:document.querySelector(".form button")};e.form.addEventListener("submit",L);e.moreImgBtn.addEventListener("click",m);let d=1;const c=20;let l="";async function L(t){if(t.preventDefault(),l=e.request.value.trim(),!l){i.error({position:"topRight",message:"Please enter a valid search query."});return}e.request.setAttribute("readonly",!0),e.submitBtn.disabled=!0,e.loader.classList.remove("hidden"),d=1;try{const r=await h(l,d,c);if(e.loader.classList.add("hidden"),e.request.removeAttribute("readonly"),e.submitBtn.disabled=!1,!r||!r.urls||r.urls.length===0){e.gallery.innerHTML="",e.moreImgBtn.classList.add("hidden"),i.warning({position:"topRight",message:"No images found. Please try a different search query."});return}e.gallery.innerHTML="",e.request.value="",g(r.urls,e.gallery),f(r)}catch{e.loader.classList.add("hidden"),e.request.removeAttribute("readonly"),e.submitBtn.disabled=!1,i.error({position:"topRight",message:"An error occurred while fetching images. Please try again later."})}}async function m(){e.loader.classList.remove("hidden");try{const t=await h(l,++d,c);if(e.loader.classList.add("hidden"),!t||!t.urls||t.urls.length===0){e.moreImgBtn.classList.add("hidden"),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});return}const r=e.gallery.lastElementChild;if(g(t.urls,e.gallery),f(t),r){const{top:a}=r.getBoundingClientRect();window.scrollBy({top:a-24,behavior:"smooth"})}}catch{e.loader.classList.add("hidden"),i.error({position:"topRight",message:"An error occurred while fetching more images. Please try again later."})}}function f(t){!t||t.urls.length<c||t.total===d*c?(e.moreImgBtn.classList.add("hidden"),e.moreImgBtn.removeEventListener("click",m),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(e.moreImgBtn.classList.remove("hidden"),e.moreImgBtn.addEventListener("click",m))}
//# sourceMappingURL=index.js.map
