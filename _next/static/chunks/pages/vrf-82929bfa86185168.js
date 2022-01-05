(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[644],{4592:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return G}});var t=r(7294),s=r(5115),o=r(1277),a=r(5933),i=r(5861),c=r(7757),u=r.n(c),l=r(5193),d=r(9545),f=r(2020),p=r(3473),m=r(6610),h=r(325),g=r(5893);function v(){var e=(0,t.useState)(""),n=e[0],r=e[1],o=(0,t.useState)(""),a=o[0],c=o[1],v=(0,p.c)(m.xo.RandomNumberConsumer),x=(0,d.j)(v,"getRandomNumber",{transactionName:"Randomness Request"}),w=x.send,b=x.state,j=x.events,k=function(){var e=(0,i.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:c("");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=(0,t.useCallback)((0,i.Z)(u().mark((function e(){var n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.randomResult();case 2:n=e.sent,c(String(n));case 4:case"end":return e.stop()}}),e)}))),[v]);(0,t.useEffect)((function(){if(j){var e=j.find((function(e){return"RequestedRandomness"===e.name}));e&&r(e.args.requestId)}}),[j]),(0,t.useEffect)((function(){v&&n&&v.on("FulfilledRandomness",(function(e){n===e&&(S(),v.removeAllListeners())}))}),[v,n,S]);var E="Mining"===b.status||"Success"===b.status&&!a,R="Exception"===b.status;return(0,g.jsxs)(g.Fragment,{children:[R&&(0,g.jsx)(h.j,{message:b.errorMessage}),(0,g.jsx)(l.zx,{onClick:k,isLoading:E,loadingText:(0,f.Yg)(b.status),colorScheme:"teal",children:"Request Randomness"}),a&&(0,g.jsxs)(s.Kq,{spacing:2,mt:4,children:[(0,g.jsx)(s.xv,{fontSize:"xl",children:"Result"}),(0,g.jsx)(s.EK,{size:"xs",colorScheme:"red",children:a})]})]})}var x=r(1662),w=r(6871),b=r(8668),j=r(9703),k=r(1358),S=r(2515),E=r(4332),R=r(7375),C=r(6450);function O(){return(O=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function y(e,n){if(null==e)return{};var r,t,s={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(s[r]=e[r]);return s}var T={exit:{scale:.85,opacity:0,transition:{opacity:{duration:.15,easings:"easeInOut"},scale:{duration:.2,easings:"easeInOut"}}},enter:{scale:1,opacity:1,transition:{opacity:{easings:"easeOut",duration:.2},scale:{duration:.2,ease:[.175,.885,.4,1.1]}}}},P=["openDelay","closeDelay","closeOnClick","closeOnMouseDown","onOpen","onClose","placement","id","isOpen","defaultIsOpen","arrowSize","arrowShadowColor","arrowPadding","modifiers","isDisabled","gutter","offset","direction"];var F=["children","label","shouldWrapChildren","aria-label","hasArrow","bg","portalProps"],_=(0,b.m$)(S.E.div),N=(0,b.Gp)((function(e,n){var r=(0,b.mq)("Tooltip",e),s=(0,b.Lr)(e),o=(0,b.Fg)(),a=s.children,i=s.label,c=s.shouldWrapChildren,u=s["aria-label"],l=s.hasArrow,d=s.bg,f=s.portalProps,p=y(s,F);d&&(r.bg=d,r[x.j.arrowBg.var]=(0,j.K1)(o,"colors",d));var m,h=function(e){void 0===e&&(e={});var n=e,r=n.openDelay,s=void 0===r?0:r,o=n.closeDelay,a=void 0===o?0:o,i=n.closeOnClick,c=void 0===i||i,u=n.closeOnMouseDown,l=n.onOpen,d=n.onClose,f=n.placement,p=n.id,m=n.isOpen,h=n.defaultIsOpen,g=n.arrowSize,v=void 0===g?10:g,w=n.arrowShadowColor,b=n.arrowPadding,k=n.modifiers,S=n.isDisabled,E=n.gutter,T=n.offset,F=n.direction,_=y(n,P),N=(0,R.qY)({isOpen:m,defaultIsOpen:h,onOpen:l,onClose:d}),M=N.isOpen,q=N.onOpen,I=N.onClose,z=(0,x.D)({enabled:M,placement:f,arrowPadding:b,modifiers:k,gutter:E,offset:T,direction:F}),D=z.referenceRef,V=z.getPopperProps,A=z.getArrowInnerProps,G=z.getArrowProps,L=(0,R.Me)(p,"tooltip"),U=t.useRef(null),$=t.useRef(),K=t.useRef(),X=t.useCallback((function(){S||($.current=window.setTimeout(q,s))}),[S,q,s]),Z=t.useCallback((function(){$.current&&clearTimeout($.current),K.current=window.setTimeout(I,a)}),[a,I]),B=t.useCallback((function(){c&&Z()}),[c,Z]),W=t.useCallback((function(){u&&Z()}),[u,Z]),Y=t.useCallback((function(e){M&&"Escape"===e.key&&Z()}),[M,Z]);(0,R.OR)("keydown",Y),t.useEffect((function(){return function(){clearTimeout($.current),clearTimeout(K.current)}}),[]),(0,R.OR)("mouseleave",Z,(function(){return U.current}));var H=t.useCallback((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),O({},e,{ref:(0,C.lq)(U,n,D),onMouseEnter:(0,j.v0)(e.onMouseEnter,X),onClick:(0,j.v0)(e.onClick,B),onMouseDown:(0,j.v0)(e.onMouseDown,W),onFocus:(0,j.v0)(e.onFocus,X),onBlur:(0,j.v0)(e.onBlur,Z),"aria-describedby":M?L:void 0})}),[X,Z,W,M,L,B,D]),J=t.useCallback((function(e,n){var r;return void 0===e&&(e={}),void 0===n&&(n=null),V(O({},e,{style:O({},e.style,(r={},r[x.j.arrowSize.var]=v?(0,j.px)(v):void 0,r[x.j.arrowShadowColor.var]=w,r))}),n)}),[V,v,w]),Q=t.useCallback((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),O({ref:n},_,e,{id:L,role:"tooltip",style:O({},e.style,{position:"relative",transformOrigin:x.j.transformOrigin.varRef})})}),[_,L]);return{isOpen:M,show:X,hide:Z,getTriggerProps:H,getTooltipProps:Q,getTooltipPositionerProps:J,getArrowProps:G,getArrowInnerProps:A}}(O({},p,{direction:o.direction}));if((0,j.HD)(a)||c)m=t.createElement(b.m$.span,O({tabIndex:0},h.getTriggerProps()),a);else{var g=t.Children.only(a);m=t.cloneElement(g,h.getTriggerProps(g.props,g.ref))}var v=!!u,S=h.getTooltipProps({},n),N=v?(0,j.CE)(S,["role","id"]):S,M=(0,j.ei)(S,["role","id"]);return i?t.createElement(t.Fragment,null,m,t.createElement(E.M,null,h.isOpen&&t.createElement(w.h_,f,t.createElement(b.m$.div,O({},h.getTooltipPositionerProps(),{__css:{zIndex:r.zIndex,pointerEvents:"none"}}),t.createElement(_,O({variants:T},N,{initial:"exit",animate:"enter",exit:"exit",__css:r}),i,v&&t.createElement(k.TX,M,u),l&&t.createElement(b.m$.div,{"data-popper-arrow":!0,className:"chakra-tooltip__arrow-wrapper"},t.createElement(b.m$.div,{"data-popper-arrow-inner":!0,className:"chakra-tooltip__arrow",__css:{bg:r.bg}}))))))):t.createElement(t.Fragment,null,a)}));j.Ts&&(N.displayName="Tooltip");var M=r(4651),q=r(9748),I=r(7495),z=q.a.Rinkeby,D=function(e){var n=m.Pl[z].randomSvg.address;return"".concat("https://testnets.opensea.io","/assets/").concat(n,"/").concat(e)};function V(e){var n=e.tokenId;return(0,I.K)().chainId===z&&(0,g.jsxs)(s.rU,{href:D(n),isExternal:!0,children:["See on OpenSea Testnet Marketplace ",(0,g.jsx)(o.h0,{mx:"2px"})]})}function A(){var e=(0,t.useState)(!1),n=e[0],r=e[1],o=(0,t.useState)(!1),a=o[0],c=o[1],v=(0,t.useState)(),x=v[0],w=v[1],b=(0,t.useState)(),j=b[0],k=b[1],S=(0,p.c)(m.xo.RandomSvg),E=(0,d.j)(S,"create",{transactionName:"NFT Request"}),R=E.send,C=E.state,O=E.events,y=(0,d.j)(S,"finishMint",{transactionName:"NFT Mint Finish"}),T=y.send,P=y.state,F=y.events,_=function(){var e=(0,i.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R();case 2:w(void 0),c(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=(0,t.useCallback)((0,i.Z)(u().mark((function e(){var n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.tokenURI(x);case 2:return n=e.sent,e.abrupt("return",(r=n,JSON.parse(atob(r.split(",")[1]))));case 4:case"end":return e.stop()}var r}),e)}))),[S,x]);(0,t.useEffect)((function(){if(O){var e=O.find((function(e){return"requestedRandomSVG"===e.name}));e&&w(e.args.tokenId)}}),[O]),(0,t.useEffect)((function(){S&&x&&S.on("CreatedUnfinishedRandomSVG",(function(e){x.eq(e)&&(c(!0),r(!0),S.removeAllListeners())}))}),[S,x]),(0,t.useEffect)((function(){F&&F.find((function(e){return"CreatedRandomSVG"===e.name}))&&q().then((function(e){k(e),r(!1)}))}),[F,q]);var I="Mining"===C.status||"Success"===C.status&&!a,z="Mining"===P.status||"Success"===P.status&&!j,D="Exception"===C.status||"Exception"===P.status,A=C.errorMessage||P.errorMessage;return(0,g.jsxs)(g.Fragment,{children:[D&&(0,g.jsx)(h.j,{message:A}),!n&&(0,g.jsx)(N,{label:"Request random number and mint new NFT associated with the result",placement:"right-start",fontSize:"xs",hasArrow:!0,children:(0,g.jsx)(l.zx,{onClick:_,isLoading:I,loadingText:(0,f.Yg)(C.status),colorScheme:"teal",children:j?"Request New NFT":"Request NFT"})}),n&&(0,g.jsx)(N,{label:"Use the random number from first step to generate unique SVG and store it as on-chain NFT metadata",placement:"right-start",fontSize:"xs",defaultIsOpen:!0,hasArrow:!0,children:(0,g.jsx)(l.zx,{onClick:function(){return T(x)},isLoading:z,loadingText:"Finishing Minting",colorScheme:"teal",children:"Finish Minting"})}),j&&(0,g.jsxs)(s.Kq,{spacing:2,mt:4,children:[(0,g.jsx)(s.xv,{fontSize:"xl",children:"Result"}),(0,g.jsx)(M.Ee,{src:j.image,alt:"Random SVG",boxSize:"360px",backgroundColor:"white",borderRadius:"lg",mt:"8"}),(0,g.jsx)(V,{tokenId:x})]})]})}var G=function(){return(0,g.jsxs)(a.Ar,{children:[(0,g.jsx)(s.X6,{as:"h1",mb:"4",children:"Randomness"}),(0,g.jsx)(s.xv,{fontSize:"xl",children:"Use VRF (Verifiable Random Function) to consume randomness in your smart contracts."}),(0,g.jsxs)(a.$0,{children:[(0,g.jsx)(v,{}),(0,g.jsx)(s.xv,{my:"4",children:"With every new request for randomness, Chainlink VRF generates a random number and cryptographic proof of how that number was determined. VRF enables smart contracts to access randomness without compromising on security or usability."}),(0,g.jsxs)(s.rU,{href:"https://docs.chain.link/docs/get-a-random-number",isExternal:!0,children:["Learn More ",(0,g.jsx)(o.h0,{mx:"2px"})]})]}),(0,g.jsxs)(a.$0,{children:[(0,g.jsx)(A,{}),(0,g.jsx)(s.xv,{my:"4",children:"100% on-chain generated NFT using VRF as randomness source. Each request creates and stores an unique Scalable Vector Graphic (SVG)."}),(0,g.jsxs)(s.rU,{href:"https://chain.link/education/nfts",isExternal:!0,children:["Learn More ",(0,g.jsx)(o.h0,{mx:"2px"})]})]})]})}},5633:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/vrf",function(){return r(4592)}])}},function(e){e.O(0,[634,466,173,774,888,179],(function(){return n=5633,e(e.s=n);var n}));var n=e.O();_N_E=n}]);