"use strict";(self.webpackChunkvegetables=self.webpackChunkvegetables||[]).push([[876],{7876:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var i=r(7106),s=r(388),a=r(9951),n=r(2791),d=r(2978),o=r(5193),l=r(184);const c=d.ZP.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: ${(0,o.Z)(10)};
  width: 100%;
  justify-content: center;
`,h=d.ZP.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;

  font-size: ${(0,o.Z)(14)};
  border: none;
  background-color: ${e=>e.isSelected?"#007bff":"#f0f0f0"};
  color: ${e=>e.isSelected?"white":"black"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${e=>e.isSelected?"#0056b3":"#e0e0e0"};
  }
  @media screen and (max-width: 768px) {
    font-size: ${(0,o.Z)(10)};
    padding: 0.4rem 0.9rem;
  }
`,u=["\uc18c\uc124","\ube44\uc18c\uc124","\uacfc\ud559","\ud310\ud0c0\uc9c0","\ub85c\ub9e8\uc2a4","\ucd94\ub9ac","\uc790\uae30\uacc4\ubc1c","\uae30\uc220","\ube14\ub85c\uadf8","\uc5ec\ud589"],x=e=>{let{selectedCategory:t,setSelectedCategory:r}=e;return(0,l.jsx)(c,{children:u.map((e=>(0,l.jsx)(h,{isSelected:t===e,onClick:()=>r(e),children:e},e)))})};var g=r(4281),p=r(5599),m=r(1087),v=r(4931),j=r(1314),f=r(1320);const w=d.ZP.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`,y=d.ZP.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  padding: 20px;
  width: 100%;
`,Z=d.ZP.div`
  text-align: center;
  padding: 20px;
`,b=e=>{var t;let{order:r,searchTitle:a,searchAuthorName:d,category:o}=e;const{data:c,fetchNextPage:h,hasNextPage:u,isFetchingNextPage:x,status:b}=(0,p.KN)(r,a,d,o),k=(0,g.Z)((()=>{u&&!x&&h()}));return"error"===b?(0,l.jsx)("div",{children:"Error loading stories"}):(0,l.jsx)(s.Y,{children:"loading"===b?(0,l.jsx)(f.s,{children:(0,l.jsx)(i.aN,{custom:!0})}):(0,l.jsx)(w,{children:(0,l.jsxs)(y,{children:[null===c||void 0===c||null===(t=c.pages)||void 0===t?void 0:t.map(((e,t)=>{var r;return(0,l.jsx)(n.Fragment,{children:null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.map((e=>{var t;return(0,l.jsx)(m.rU,{to:`/gptpage/detail/${e.id}`,style:{textDecoration:"none",color:"black"},children:(0,l.jsx)(v.Z,{id:e.id,title:e.title,imageUrl:(null===(t=e.images)||void 0===t?void 0:t.length)>0?e.images[0].path:"https://picsum.photos/200/150",category:e.category,authorName:e.authorName,isPrompt:!1,userId:e.userId,clicks:e.clicks,likeCount:e.likeCount,createdAt:e.createdAt})},e.id)}))},t)})),x&&(0,l.jsx)(Z,{children:(0,l.jsx)(j.Z,{width:"2rem"})}),(0,l.jsx)("div",{ref:k,style:{height:"20px"}})]})})})};var k=r(1611);const $=d.ZP.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
`,P=d.ZP.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${e=>{let{currentIndex:t,cardWidth:r,gap:i}=e;return`translateX(-${t*(r+i)}px)`}};
  gap: ${e=>{let{gap:t}=e;return`${t}px`}};

  > div {
    flex: 0 0 ${e=>{let{cardWidth:t}=e;return`${t}px`}}; // 카드의 너비를 지정
  }
`,C=d.ZP.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  &:hover {
    scale: 1.1;
  }
  transition: scale 0.3s ease;
`,N=(0,d.ZP)(C)`
  left: 10px;
`,S=(0,d.ZP)(C)`
  right: 10px;
`,A=e=>{let{items:t}=e;const[r,i]=(0,n.useState)(0),[s,a]=(0,n.useState)(0),[d,o]=(0,n.useState)(20),c=(0,n.useRef)(null),[h,u]=(0,n.useState)(5);(0,n.useEffect)((()=>{const e=()=>{if(c.current){const e=c.current.clientWidth,r=window.innerWidth>=1200?5:window.innerWidth>=768?3:1,s=window.innerWidth>=768?20:10;o(s),u(r),a((e-s*(r-1))/r),i((e=>Math.min(e,t?t.length-r:0)))}};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[t]);return t&&t.length>0?(0,l.jsxs)($,{ref:c,children:[(0,l.jsx)(P,{currentIndex:r,cardWidth:s,gap:d,children:t.map((e=>{var t;return(0,l.jsx)(v.Z,{id:e.id,title:e.title,imageUrl:(null===(t=e.images[0])||void 0===t?void 0:t.path)||"https://picsum.photos/200/150",clicks:e.clicks,createdAt:e.createdAt,category:e.category,authorName:e.authorName,isPrompt:!1,userId:e.userId,likeCount:e.likeCount,cardWidth:s},e.id)}))}),r>0&&(0,l.jsx)(N,{onClick:()=>{i((e=>Math.max(e-1,0)))},children:"<"}),r<t.length-h&&(0,l.jsx)(S,{onClick:()=>{i((e=>Math.min(e+1,t?t.length-h:0)))},children:">"})]}):(0,l.jsx)("div",{children:"\ub370\uc774\ud130\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."})};var W=r(4786),z=r(1909),I=r(2202);const T="340px",E=d.ZP.h2`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  width: 10rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 1rem;
  color: ${(0,W.Z)("forest",700)};
  background-color: ${(0,W.Z)("forest",300)};
`,F=d.ZP.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${e=>{let{$height:t}=e;return t}};
`,M=()=>{var e,t;const{data:r,status:i}=(0,p.uP)(),{data:s,status:a}=(0,p.d3)(),n=(null===r||void 0===r||null===(e=r.data)||void 0===e?void 0:e.stories)||[],d=(null===s||void 0===s||null===(t=s.data)||void 0===t?void 0:t.stories)||[];return(0,l.jsxs)("div",{children:[(0,l.jsxs)(E,{children:["\ucd5c\uace0\uc791",(0,l.jsx)(I.sr,{})]}),"loading"===i?(0,l.jsxs)(F,{$height:T,children:[(0,l.jsx)(j.Z,{width:"3rem"})," "]}):(0,l.jsx)(A,{items:n}),(0,l.jsxs)(E,{children:["\ucd94\ucc9c\uc791",(0,l.jsx)(z.JXB,{})]}),"loading"===a?(0,l.jsxs)(F,{$height:T,children:[(0,l.jsx)(j.Z,{width:"3rem"})," "]}):(0,l.jsx)(A,{items:d})]})};var U=r(868);function Y(){const{searchTitle:e,searchAuthorName:t,setSearchTitle:r,setSearchAuthorName:n,category:d,setCategory:o,order:c,setOrder:h}=(0,k.R)(),{mutate:u,status:g}=(0,p.GZ)();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.Y,{children:(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{}),(0,l.jsx)(a.Z,{setSearchTitle:r,setSearchAuthorName:n,order:c,setOrder:h,backColorType:"gray",setCategory:o}),(0,l.jsx)(x,{selectedCategory:d,setSelectedCategory:o}),(0,l.jsx)(i.zx,{onClick:()=>{window.confirm("\uc2a4\ud1a0\ub9ac\ub97c \ub9cc\ub4e4\uaca0\uc2b5\ub2c8\uae4c?")&&u()},status:g,children:"\uc2a4\ud1a0\ub9ac \ub9cc\ub4e4\uae30"}),(0,l.jsx)(b,{order:c,searchTitle:e,searchAuthorName:t,category:d})]})}),(0,l.jsx)(U.Z,{})]})}}}]);
//# sourceMappingURL=876.7c4d2085.chunk.js.map