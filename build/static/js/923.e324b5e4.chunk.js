"use strict";(self.webpackChunkvegetables=self.webpackChunkvegetables||[]).push([[923],{6923:(e,t,n)=>{n.r(t),n.d(t,{default:()=>P});var a=n(2791),r=n(8668),d=n(9759),i=n(3025),l=n(2978),o=n(7106),s=n(1909),c=n(6186),x=n(1774),h=n(6447),u=n(9328),g=n(2422);var p=n(184);const v=()=>{const[e,t]=(0,a.useState)([]),[n,i]=(0,a.useState)(""),{currentPage:l,setCurrentPage:s,handleNextPage:c,handlePrevPage:v}=(0,r.Z)(),[f,P]=(0,a.useState)(0),w=(0,a.useCallback)((async()=>{const e=await(async(e,t)=>await(0,g.H)(`/bannedword?take=${e}&page=${t}`).get())(10,l);e&&200===e.status&&(t(e.data),P(e.total))}),[l]);(0,a.useEffect)((()=>{w()}),[w,l]);const b=async e=>{const n=await(async e=>await(0,g.H)(`/bannedword/${e}`).remove())(e);n&&200===n.status&&(t(n.data),P(n.total))};return(0,p.jsxs)(h.Z,{title:"\ub9ac\ubdf0 \uae08\uce59\uc5b4 \uad00\ub9ac",children:[(0,p.jsxs)(j,{children:[(0,p.jsx)(d.II,{type:"text",value:n,onChange:e=>i(e.target.value),placeholder:"\uae08\uce59\uc5b4 \uc791\uc131"}),(0,p.jsx)(o.zx,{onClick:async()=>{const e=await(async e=>await(0,g.H)("/bannedword").post({word:e}))(n);e&&201===e.status&&(t(e.data),P(e.total)),i("")},children:"\ucd94\uac00"})]}),(0,p.jsx)(u.Z,{headers:["NO.","\uae08\uce59\uc5b4","\uc0ad\uc81c"],children:e.length>0?e.map(((e,t)=>(0,p.jsx)(a.Fragment,{children:(0,p.jsxs)(d.fz,{children:[(0,p.jsx)(d.vJ,{width:30,children:10*(l-1)+t+1}),(0,p.jsx)(d.vJ,{width:100,children:e.word}),(0,p.jsx)(d.vJ,{children:(0,p.jsx)(d.XH,{onClick:()=>b(e.id)})})]})},e.id))):(0,p.jsx)(d.fz,{children:(0,p.jsx)(d.vJ,{colSpan:3,children:"\uae08\uce59\uc5b4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."})})}),(0,p.jsx)(d.Nl,{children:(0,p.jsx)(x.Z,{currentPage:l,setCurrentPage:s,handlePrevPage:v,handleNextPage:c,total:f})})]})},j=l.ZP.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;var f=n(1320);const P=()=>{var e;const{currentPage:t,setCurrentPage:n,handleNextPage:l,handlePrevPage:g}=(0,r.Z)(),{user:j}=(0,c.useUserStore)(),P=(null===j||void 0===j?void 0:j.id)||"",{data:I,isLoading:H}=(0,i.sk)(t,10),{mutate:A}=(0,i.kl)(P),[L,$]=(0,a.useState)(null),D=null===I||void 0===I?void 0:I.data,E=null===I||void 0===I?void 0:I.total;return H?(0,p.jsx)(f.E,{children:(0,p.jsx)(o.aN,{})}):(0,p.jsxs)(w,{children:[(0,p.jsxs)(h.Z,{title:"\ub9ac\ubdf0 \uad00\ub9ac",children:[(0,p.jsx)(u.Z,{headers:["No","\ucc45\uc774\ub984","\ub313\uae00\uc218","\uc0c1\uc138\ubcf4\uae30"],children:null===D||void 0===D?void 0:D.map(((e,n)=>(0,p.jsx)(a.Fragment,{children:(0,p.jsxs)(d.fz,{children:[(0,p.jsx)(d.vJ,{width:30,children:10*(t-1)+n+1}),(0,p.jsx)(d.vJ,{width:100,children:e.bookTitle}),(0,p.jsx)(d.vJ,{width:100,children:e.total}),(0,p.jsx)(d.vJ,{width:100,children:e.total>0&&(0,p.jsx)(s.Zh8,{onClick:()=>{return t=e.commentId,void $((e=>e===t?null:t));var t}})})]})},e.commentId)))}),(0,p.jsx)(d.Nl,{children:E?(0,p.jsx)(x.Z,{currentPage:t,setCurrentPage:n,total:E,handleNextPage:l,handlePrevPage:g}):(0,p.jsx)(S,{children:"\ub313\uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."})})]}),L&&(0,p.jsx)(b,{children:(0,p.jsxs)(m,{children:[(0,p.jsx)(Z,{onClick:()=>$(null),children:"\xd7"}),null===D||void 0===D||null===(e=D.find((e=>e.commentId===L)))||void 0===e?void 0:e.commentArray.map((e=>(0,p.jsxs)(k,{children:[(0,p.jsx)(y,{children:e.content}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(N,{children:[(0,p.jsx)(z,{children:"\uc791\uc131\uc77c:"})," ",new Date(e.createdAt).toLocaleString()]}),(0,p.jsxs)(N,{children:[(0,p.jsx)(z,{children:"\uc218\uc815\uc77c:"})," ",new Date(e.updatedAt).toLocaleString()]})]}),(0,p.jsx)(J,{onClick:()=>{return t=e.id,void(P&&A(t));var t},children:"\uc0ad\uc81c"})]},e.id)))]})}),(0,p.jsx)(v,{})]})},w=l.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,b=l.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`,m=l.ZP.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`,Z=l.ZP.button`
  float: right;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
`,k=l.ZP.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  width: 100%;
`,y=l.ZP.p`
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
`,C=l.ZP.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: #666;
`,N=l.ZP.span`
  display: flex;
  align-items: center;
`,z=l.ZP.span`
  font-weight: bold;
  margin-right: 8px;
`,J=l.ZP.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;

  &:hover {
    background-color: #ff7875;
  }
`,S=l.ZP.div`
  text-align: center;
  color: #666;
`}}]);
//# sourceMappingURL=923.e324b5e4.chunk.js.map