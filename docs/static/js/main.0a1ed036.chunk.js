(this["webpackJsonpwix-minesweeper"]=this["webpackJsonpwix-minesweeper"]||[]).push([[0],{102:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(13),o=n.n(i),c=(n(102),n(142)),l=n(158),s=n(156),u=n(20),m=n(144),d=n(146),f=n(147),p=n(49),h=n(79),g=n.n(h),b="TOGGLE_MENU",v="TOGGLE_SUPERMAN",O="SET_NEW_GAME_PARAMETER",y="START_GAME",w="TOGGLE_FLAG",x="OPEN_CELL",E="MOVE_VIEWPORT",j="SET_MESSAGE",I="SET_FIELD",N="UPDATE_FLAG_COUNT",S="SET_VIEWPORT_OFFSET",T="SET_GAME_STAGE",G="SET_VIEWPORT_SIZE",k={NOT_STARTED:"NOT_STARTED",STARTED:"STARTED",WON:"WON",LOST:"LOST"},A=(n(107),function(e){return{type:b,payload:{show:e}}}),M=function(e,t){return{type:E,payload:{dx:e,dy:t}}},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return{type:j,payload:{severity:t,visible:e,title:n,content:a}}},W=function(e){return{type:I,payload:{field:e}}},R=function(e){return{type:N,payload:{delta:e}}},D=function(e){return{type:T,payload:{stage:e}}},F=Object(c.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},timer:{marginRight:e.spacing(2)},flagCounter:{},flagIcon:{color:"rgb(252, 150, 40)"}}}));var _=Object(u.b)()((function(e){var t=e.dispatch,n=F();return r.a.createElement(m.a,{position:"static"},r.a.createElement(d.a,null,r.a.createElement(f.a,{edge:"start",className:n.menuButton,color:"inherit","aria-label":"menu",onClick:function(){t(A(!0))}},r.a.createElement(g.a,null)),r.a.createElement(p.a,{variant:"h6",className:n.title},"Minesweeper")))})),L=n(161),z=n(148),P=n(150),H=n(151),U=n(152),B=n(8),K=n(157),Y=n(149),V={minWidth:3,maxWidth:300,minHeight:3,maxHeight:300,minMines:1,minFreeCells:1,viewportWidth:10,viewportHeight:7,autoCloseMenuAfterStart:!0,autoCloseMenuOnSupermanToggle:!1,fontSizeToCellRatio:.75,messageTimeout:5e3,minimapSize:"10rem",panelWidth:"15rem",drawerWidth:"20rem",cellSize:"2.1rem",cellFontSize:"1.1rem",edgeBorder:"1px solid black",nonEdgeBorder:"1px solid transparent"},q=Object(c.a)((function(e){return{root:{width:"100%"},formRow:{padding:e.spacing(2)}}}));var J=Object(u.b)((function(e){return Object(B.a)({},e.newGame.gameInfo)}))((function(e){var t=e.width,n=e.height,a=e.mines,i=e.dispatch,o=q(),c=V.minWidth,l=V.maxWidth,s=V.minHeight,u=V.maxHeight,m=V.minMines,d=t*n-V.minFreeCells,f=function(){return t>=c&&t<=l},p=function(){return n>=s&&n<=u},h=function(){return a>=m&&a<=d},g=function(e){var t,n;e.target.id&&e.target.value&&i((t=e.target.id,n=parseInt(e.target.value),{type:O,payload:{key:t,value:n}}))},b=function(e){V.autoCloseMenuAfterStart&&i(A(!1)),i({type:y,payload:{gameInfo:{width:t,height:n,mines:a}}})};return r.a.createElement("form",{className:o.root},r.a.createElement("div",{className:o.formRow},r.a.createElement(K.a,{id:"width",label:"Width",type:"number",value:t,fullWidth:!0,inputProps:{min:c,max:l},error:!f(),onChange:g})),r.a.createElement("div",{className:o.formRow},r.a.createElement(K.a,{id:"height",label:"Height",type:"number",value:n,fullWidth:!0,inputProps:{min:s,max:u},error:!p(),onChange:g})),r.a.createElement("div",{className:o.formRow},r.a.createElement(K.a,{id:"mines",label:"Mines",type:"number",value:a,fullWidth:!0,inputProps:{min:m,max:d},error:!h(),onChange:g})),r.a.createElement("div",{className:o.formRow,onSubmit:b},r.a.createElement(Y.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:b,disabled:!f()||!p()||!h()},"Start")))})),Z=n(83),$=n.n(Z),Q=n(82),X=n.n(Q),ee=n(81),te=n.n(ee),ne=Object(c.a)((function(e){return{root:{},list:{},listItem:{minWidth:V.drawerWidth},listItemText:{padding:e.spacing(2)},drawer:{}}}));var ae=Object(u.b)((function(e){return{open:e.ui.showMenu,superman:e.currentGame.superman}}))((function(e){var t=e.open,n=e.superman,a=e.dispatch,i=ne(),o=function(e){a(A(!1))},c=function(e){a(function(e){return{type:v,payload:{superman:e}}}(!n)),V.autoCloseMenuOnSupermanToggle&&a(A(!1))},l=n?r.a.createElement(te.a,{color:"primary"}):r.a.createElement(X.a,{color:"primary"});return r.a.createElement("div",{className:i.root},r.a.createElement(L.a,{className:i.drawer,anchor:"left",open:t,variant:"persistent",onClose:o},r.a.createElement(z.a,{className:i.list},r.a.createElement(P.a,{className:i.listItem},r.a.createElement(H.a,null,"\xa0"),r.a.createElement(U.a,null,r.a.createElement(f.a,{edge:"end",onClick:o},r.a.createElement($.a,null)))),r.a.createElement(P.a,{className:i.listItem},r.a.createElement(J,null)),r.a.createElement(P.a,{button:!0,onClick:c,className:i.listItem},r.a.createElement(H.a,{className:i.listItemText},"Superman"),r.a.createElement(U.a,null,r.a.createElement(f.a,{onClick:c},l))))))})),re=n(160),ie=n(153),oe=Object(c.a)((function(e){return{root:{textAlign:"start",position:"absolute",right:"0",top:"0",width:"20rem"}}}));var ce=Object(u.b)((function(e){return e.ui.message}))((function(e){var t=e.severity,n=e.visible,i=e.title,o=e.content,c=e.dispatch,l=oe();return Object(a.useEffect)((function(){setTimeout((function(){n&&c(C(!1))}),V.messageTimeout)})),n?r.a.createElement(re.a,{variant:"filled",className:l.root,severity:t},r.a.createElement(ie.a,null,i),o):" "})),le=n(155),se=n(115),ue=n(85),me=n.n(ue),de=n(87),fe=n.n(de),pe=n(86),he=n.n(pe),ge=n(88),be=n.n(ge),ve=n(58),Oe=n.n(ve),ye=n(154),we=n(84),xe=n.n(we),Ee=Object(c.a)((function(e){return{root:{height:function(e){return e.size},width:function(e){return e.size},boxSizing:"border-box",margin:e.spacing(1),display:"flex",justifyContent:"center",alignItems:"center",minWidth:"0",fontSize:V.cellFontSize,padding:"0"},mineDetected:{background:e.palette.primary.light},opened:{},closed:{border:"1px solid transparent"},icon:{height:V.cellSize,width:V.cellSize,display:"flex",justifyContent:"center",alignItems:"center"},1:{color:"blue"},2:{color:"green"},3:{color:"red"},4:{color:"purple"},5:{color:"maroon"},6:{color:"turquoise"},7:{color:"black"},8:{color:"gray"}}}));var je=function(e){var t=e.disabled,n=e.revealMine,a=e.cell,i=e.superman,o=e.size,c=e.showFlagOnMine,l=e.onOpen,s=e.onFlag,u=Ee({size:o}),m=[u.root,a.isOpened?u.opened:u.closed];i&&a.hasMine&&!n&&m.push(u.mineDetected),a.isOpened&&!a.hasMine&&a.minesAround>0&&m.push(u[a.minesAround]);var d=function(e,t,n,a){if(e.hasMine&&(e.isOpened||n))return r.a.createElement(ye.a,{className:t.icon},r.a.createElement("img",{src:xe.a,height:"100%",width:"100%",alt:"mine"}));if(e.isOpened&&!e.hasMine&&e.minesAround>0)return e.minesAround;if(!e.isOpened&&e.isFlagged||e.hasMine&&a)return r.a.createElement(Oe.a,{className:t.icon,color:"secondary"});return" "}(a,u,n,c);return a.isOpened?function(e,t){return r.a.createElement(se.a,{variant:"outlined",className:e.join(" ")},t)}(m,d):function(e){var t=e.resClasses,n=e.content,a=e.disabled,i=e.flagged,o=e.onOpen,c=e.onFlag;return r.a.createElement(Y.a,{disabled:a,className:t.join(" "),variant:"contained",onClick:function(e){e.shiftKey?c():i||o()}},n)}({resClasses:m,content:d,disabled:t,flagged:a.isFlagged,onOpen:l,onFlag:s})},Ie=Object(c.a)((function(e){return{root:{display:"flex",flexDirection:"row",borderWidth:"1px",borderStyle:"solid",borderTopColor:function(t){return t.border.top?e.palette.primary.light:"transparent"},borderBottomColor:function(t){return t.border.bottom?e.palette.primary.light:"transparent"},borderLeftColor:function(t){return t.border.left?e.palette.primary.light:"transparent"},borderRightColor:function(t){return t.border.right?e.palette.primary.light:"transparent"}},column:{display:"flex",flexDirection:"column",justifyContent:"center"}}}));var Ne=Object(u.b)((function(e){return e.currentGame}))((function(e){var t=e.field,n=e.dispatch,a=e.superman,i=e.gameInfo,o=e.viewport,c=e.stage,l=e.border,s=Ie({border:l}),u=function(e){var t=e.field,n=e.gameInfo,a=e.viewport,i=e.classes,o=e.superman,c=e.stage,l=e.handleFlag,s=e.handleOpen;return t.filter((function(e,t){return n.width<=a.width||t>=a.offset.x&&t<a.offset.x+a.width})).map((function(e,t){var u=e.filter((function(e,t){return n.height<=a.height||t>=a.offset.y&&t<a.offset.y+a.height})).map((function(e,n){var u=t+a.offset.x,m=n+a.offset.y,d=u+"_"+m;return r.a.createElement(je,{className:i.cell,key:d,cell:e,superman:o,size:V.cellSize,revealMine:c===k.LOST,showFlagOnMine:c===k.WON,disabled:c===k.LOST||c===k.WON,onFlag:function(){return l(u,m)},onOpen:function(){return s(u,m)}})}));return r.a.createElement("div",{className:i.column,key:t},u)}))}({field:t,gameInfo:i,viewport:o,classes:s,superman:a,stage:c,handleFlag:function(e,t){n(function(e,t){return{type:w,payload:{x:e,y:t}}}(e,t))},handleOpen:function(e,t){n(function(e,t){return{type:x,payload:{x:e,y:t}}}(e,t))}});return r.a.createElement("div",{className:s.root},u)})),Se=Object(c.a)((function(e){return{root:{border:"1px solid #ccc",position:"relative",overflow:"hidden",width:function(e){return e.gameInfo.width>=e.gameInfo.height?"100%":Te(e.gameInfo.width/e.gameInfo.height)},height:function(e){return e.gameInfo.height>=e.gameInfo.width?"100%":Te(e.gameInfo.height/e.gameInfo.width)}},viewport:{background:e.palette.info.light,position:"absolute",width:function(e){return Te(e.viewport.width/e.gameInfo.width)},height:function(e){return Te(e.viewport.height/e.gameInfo.height)},left:function(e){return Te(e.viewport.offset.x/e.gameInfo.width)},top:function(e){return Te(e.viewport.offset.y/e.gameInfo.height)}}}}));function Te(e){return 100*e+"%"}var Ge=function(e){var t=Se(e);return r.a.createElement(se.a,{variant:"outlined",square:!0,className:t.root},r.a.createElement("div",{className:t.viewport},"\xa0"))};function ke(e,t,n,a){if(0!==n){if(e.width>=t.width)return!1;var r=e.offset.x+n;if(r<0||r+e.width>t.width)return!1}if(0!==a){if(e.height>=t.height)return!1;var i=e.offset.y+a;if(i<0||i+e.height>t.height)return!1}return!0}var Ae=Object(c.a)((function(e){return{root:{display:"flex",flexDirection:"row"},panel:{margin:e.spacing(1),flex:"0",alignItems:"center",minWidth:V.panelWidth,display:"flex",flexDirection:"column",padding:e.spacing(1)},stats:{marginBottom:e.spacing(2)},minimap:{height:V.minimapSize,width:V.minimapSize,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},divider:{flex:"1"},buttons:{display:"grid",gridColumnGap:e.spacing(1),gridRowGap:e.spacing(1),gridTemplateAreas:' ". U ." "L D R" '},fieldWrapper:{},btnUp:{gridArea:"U"},btnDown:{gridArea:"D"},btnLeft:{gridArea:"L"},btnRight:{gridArea:"R"}}}));var Me=Object(u.b)((function(e){return e.currentGame}))((function(e){var t=e.dispatch,n=e.viewport,i=e.gameInfo,o=e.stage,c=e.flagsSet,l=Ae();if(Object(a.useEffect)((function(){var e=function(e){setTimeout((function(){var n=!1;["KeyW","ArrowUp"].indexOf(e.code)>=0?n={dx:0,dy:-1}:["KeyS","ArrowDown"].indexOf(e.code)>=0?n={dx:0,dy:1}:["KeyA","ArrowLeft"].indexOf(e.code)>=0?n={dx:-1,dy:0}:["KeyD","ArrowRight"].indexOf(e.code)>=0&&(n={dx:1,dy:0}),n&&t(M(n.dx,n.dy))}))};return document.addEventListener("keyup",e),function(){document.removeEventListener("keyup",e)}})),o===k.NOT_STARTED)return r.a.createElement(p.a,{variant:"h4"},'To start the game, click on the hamburger menu in the left upper corner, enter the desired parameters and click "Start" button.');if(o===k.LOADING)return r.a.createElement(le.a,null);var s=function(e){var t=e.stats,n=e.viewport,a=e.gameInfo,i=e.classes,o=e.changeOffset;if(n.height<a.height||n.width<a.width){var c=0;return r.a.createElement(se.a,{variant:"outlined",className:i.panel},t,r.a.createElement("div",{className:i.minimap},r.a.createElement(Ge,{gameInfo:a,viewport:n}),r.a.createElement(p.a,{variant:"caption"},"Minimap")),r.a.createElement("div",{className:i.divider},"\xa0"),r.a.createElement("div",{className:i.buttons},r.a.createElement(Y.a,{key:c++,variant:"contained",className:i.btnUp,disabled:!ke(n,a,0,-1),startIcon:r.a.createElement(me.a,null),onClick:function(){return o(0,-1)}},"W"),r.a.createElement(Y.a,{key:c++,variant:"contained",className:i.btnDown,disabled:!ke(n,a,0,1),startIcon:r.a.createElement(he.a,null),onClick:function(){return o(0,1)}},"S"),r.a.createElement(Y.a,{key:c++,variant:"contained",className:i.btnLeft,disabled:!ke(n,a,-1,0),startIcon:r.a.createElement(fe.a,null),onClick:function(){return o(-1,0)}},"A"),r.a.createElement(Y.a,{key:c++,variant:"contained",className:i.btnRight,disabled:!ke(n,a,1,0),startIcon:r.a.createElement(be.a,null),onClick:function(){return o(1,0)}},"D")))}return r.a.createElement(se.a,{className:i.panel,variant:"outlined"},t)}({stats:function(e){var t=e.classes,n=e.gameInfo,a=e.flagsSet;return r.a.createElement("div",{className:t.stats},r.a.createElement(p.a,{color:"secondary",variant:"h4",component:"div"},r.a.createElement(Oe.a,null)," \xd7 ",n.mines-a))}({classes:l,gameInfo:i,flagsSet:c}),viewport:n,gameInfo:i,classes:l,changeOffset:function(e,n){t(M(e,n))}}),u=function(e){var t=e.viewport,n=e.gameInfo;return{top:t.height>=n.height||!ke(t,n,0,-1),bottom:t.height>=n.height||!ke(t,n,0,1),left:t.width>=n.width||!ke(t,n,-1,0),right:t.width>=n.width||!ke(t,n,1,0)}}({viewport:n,gameInfo:i});return r.a.createElement("div",{className:l.root},s,r.a.createElement("div",{className:l.fieldWrapper},r.a.createElement(Ne,{className:l.field,border:u})))})),Ce=Object(c.a)((function(e){return{root:{},container:{paddingTop:e.spacing(4),display:"flex",justifyContent:"center",alignItems:"center"},box:{position:"relative"}}}));var We=function(){var e=Ce();return r.a.createElement("div",{className:"App"},r.a.createElement(_,null),r.a.createElement(ae,null),r.a.createElement(l.a,{className:e.box},r.a.createElement(s.a,{className:e.container},r.a.createElement(Me,null)),r.a.createElement(ce,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Re=n(15),De=n.n(Re),Fe=n(55),_e=n(36),Le=n(90),ze=n(11),Pe=function(e){return e.currentGame.gameInfo},He=function(e){return e.currentGame},Ue=n(59),Be=De.a.mark(Ye),Ke=De.a.mark(Ve);function Ye(e){var t,n,a,r,i,o,c,l;return De.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.payload,n=t.x,a=t.y,s.next=3,Object(ze.d)(He);case 3:if(r=s.sent,i=r.field,o=r.flagsSet,c=r.gameInfo,!i[n][a].isOpened){s.next=9;break}return s.abrupt("return");case 9:if(l=Object(Ue.cloneDeep)(i),!i[n][a].isFlagged){s.next=17;break}return l[n][a].isFlagged=!1,s.next=14,Object(ze.c)(W(l));case 14:return s.next=16,Object(ze.c)(R(-1));case 16:return s.abrupt("return");case 17:if(o!==c.mines){s.next=21;break}return s.next=20,Object(ze.c)(C(!0,"warning","No flags left","You had just enough flags to flag all the mines."));case 20:return s.abrupt("return");case 21:return l[n][a].isFlagged=!0,s.next=24,Object(ze.c)(W(l));case 24:return s.next=26,Object(ze.c)(R(1));case 26:if(o+1!==c.mines||l.find((function(e,t){return e.find((function(e,t){return e.isFlagged&&!e.hasMine}))}))){s.next=31;break}return s.next=29,Object(ze.c)(C(!0,"success","You win!","Congratulations!"));case 29:return s.next=31,Object(ze.c)(D(k.WON));case 31:case"end":return s.stop()}}),Be)}function Ve(){return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ze.e)(w,Ye);case 2:case"end":return e.stop()}}),Ke)}var qe=Ve,Je=n(89),Ze=n(65);function $e(e){return function(e){var t=e.width,n=e.height,a=e.mines;return!(t<V.minWidth||t>V.maxWidth||n<V.minHeight||n>V.maxHeight||a<V.minMines||a>t*n-V.minFreeCells)}(e)?function(e,t){for(var n=e.width,a=e.height,r=[],i=0;i<n;i++){r[i]=[];for(var o=0;o<a;o++)r[i][o]={isFlagged:!1,isOpened:!1,hasMine:!1,minesAround:null}}var c,l=Object(Je.a)(t);try{for(l.s();!(c=l.n()).done;){var s=c.value;r[s.x][s.y].hasMine=!0}}catch(f){l.e(f)}finally{l.f()}for(var u=0;u<n;u++)for(var m=0;m<a;m++)if(!r[u][m].hasMine){var d=Xe(u,m,n,a).filter((function(e){return r[e.x][e.y].hasMine})).length;r[u][m].minesAround=d}return r}(e,function(e,t){for(var n=e.height,a=e.width,r=[],i=[],o=0;o<a;o++)for(var c=0;c<n;c++)i.push({x:o,y:c});for(var l=0;l<t;l++){var s=Math.floor(Math.random()*i.length),u=i.splice(s,1);r.push.apply(r,Object(Ze.a)(u))}return r}(e,e.mines)):null}function Qe(e,t,n){for(var a=Object(Ue.cloneDeep)(n),r=[{x:e,y:t}],i=0,o=function(){i=Math.max(i,r.length);var e=r.shift();if(!a[e.x][e.y].isOpened&&!a[e.x][e.y].isFlagged&&(a[e.x][e.y].isOpened=!0,0===a[e.x][e.y].minesAround)){var t=Xe(e.x,e.y,a.length,a[e.x].length).filter((function(t){return!a[t.x][t.y].isOpened&&!a[e.x][e.y].isFlagged}));r.push.apply(r,Object(Ze.a)(t))}};r.length>0;)o();return a}function Xe(e,t,n,a){return[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}].map((function(n){return{x:e+n.x,y:t+n.y}})).filter((function(e){return e.x>=0&&e.x<n&&e.y>=0&&e.y<a}))}var et=De.a.mark(nt),tt=De.a.mark(at);function nt(){var e,t;return De.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(ze.d)(Pe);case 2:return e=n.sent,t=$e(e),n.next=6,Object(ze.c)(W(t));case 6:return n.next=8,Object(ze.c)(D(k.STARTED));case 8:return n.abrupt("return");case 9:case"end":return n.stop()}}),et)}function at(){return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ze.e)(y,nt);case 2:case"end":return e.stop()}}),tt)}var rt=at,it=De.a.mark(ct),ot=De.a.mark(lt);function ct(e){var t,n,a;return De.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(ze.d)(He);case 2:if(!ke((t=r.sent).viewport,t.gameInfo,e.payload.dx,e.payload.dy)){r.next=8;break}return n=t.viewport.offset.x+e.payload.dx,a=t.viewport.offset.y+e.payload.dy,r.next=8,Object(ze.c)({type:S,payload:{offset:{x:n,y:a}}});case 8:case"end":return r.stop()}}),it)}function lt(){return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ze.e)(E,ct);case 2:case"end":return e.stop()}}),ot)}var st=lt,ut=De.a.mark(dt),mt=De.a.mark(ft);function dt(e){var t,n,a,r,i;return De.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.payload,n=t.x,a=t.y,o.next=3,Object(ze.d)(He);case 3:if(!(r=o.sent).field[n][a].hasMine){o.next=10;break}return o.next=7,Object(ze.c)(D(k.LOST));case 7:return o.next=9,Object(ze.c)(C(!0,"warning","You lost!","Maybe you will be luckier next time."));case 9:return o.abrupt("return");case 10:if(i=Qe(n,a,r.field),i.reduce((function(e,t){return e+t.reduce((function(e,t){return e+(t.isOpened?0:1)}),0)}),0)!==r.gameInfo.mines){o.next=17;break}return o.next=15,Object(ze.c)(C(!0,"success","You won!","You opened all the safe cells, that counts as win!"));case 15:return o.next=17,Object(ze.c)(D(k.WON));case 17:return o.next=19,Object(ze.c)(W(i));case 19:case"end":return o.stop()}}),ut)}function ft(){return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ze.e)(x,dt);case 2:case"end":return e.stop()}}),mt)}var pt=ft,ht=De.a.mark(Ot),gt={ui:{showMenu:!1,message:{severity:"info",visible:!1,title:"",content:""}},currentGame:{gameInfo:{width:15,height:15,mines:10},viewport:{width:V.viewportWidth,height:V.viewportHeight,offset:{x:0,y:0}},stage:k.NOT_STARTED,superman:!0,flagsSet:0,field:[]},newGame:{gameInfo:{width:300,height:300,mines:1}}},bt=Object(Le.a)(),vt=Object(_e.d)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b:return Object(B.a)(Object(B.a)({},e),{},{ui:Object(B.a)(Object(B.a)({},e.ui),{},{showMenu:t.payload.show})});case v:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{superman:t.payload.superman})});case O:return Object(B.a)(Object(B.a)({},e),{},{newGame:Object(B.a)(Object(B.a)({},e.newGame),{},{gameInfo:Object(B.a)(Object(B.a)({},e.newGame.gameInfo),{},Object(Fe.a)({},t.payload.key,t.payload.value))})});case y:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)(Object(B.a)({},e.currentGame),t.payload),{},{flagsSet:0,stage:k.LOADING,viewport:Object(B.a)(Object(B.a)({},e.currentGame.viewport),{},{offset:{x:0,y:0}})})});case j:return Object(B.a)(Object(B.a)({},e),{},{ui:Object(B.a)(Object(B.a)({},e.ui),{},{message:t.payload})});case I:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{field:t.payload.field})});case N:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{flagsSet:e.currentGame.flagsSet+t.payload.delta})});case S:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{viewport:Object(B.a)(Object(B.a)({},e.currentGame.viewport),{},{offset:t.payload.offset})})});case T:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{stage:t.payload.stage})});case G:return Object(B.a)(Object(B.a)({},e),{},{currentGame:Object(B.a)(Object(B.a)({},e.currentGame),{},{viewport:Object(B.a)(Object(B.a)({},e.currentGame.viewport),t.payload)})});default:return e}}),Object(_e.a)(bt));function Ot(){return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ze.a)([Object(ze.b)(qe),Object(ze.b)(rt),Object(ze.b)(st),Object(ze.b)(pt)]);case 2:case"end":return e.stop()}}),ht)}bt.run(Ot),o.a.render(r.a.createElement(u.a,{store:vt},r.a.createElement(We,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},84:function(e,t,n){e.exports=n.p+"static/media/mine.6561ee48.svg"},98:function(e,t,n){e.exports=n(113)}},[[98,1,2]]]);
//# sourceMappingURL=main.0a1ed036.chunk.js.map