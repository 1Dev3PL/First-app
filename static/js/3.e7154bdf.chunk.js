(this["webpackJsonpfirst-app"]=this["webpackJsonpfirst-app"]||[]).push([[3],{295:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__xxJGX"}},296:function(e,s,a){e.exports={friends:"Friends_friends__2HUhg"}},297:function(e,s,a){e.exports={friend:"Friend_friend__2h3fz",activeLink:"Friend_activeLink__2HVIe"}},298:function(e,s,a){e.exports={messages:"Messages_messages__O-ldN"}},299:function(e,s,a){e.exports={message:"Message_message__3jhgM"}},301:function(e,s,a){"use strict";a.r(s);var n=a(28),t=a(29),i=a(31),r=a(30),c=a(32),m=a(0),d=a.n(m),l=a(13),u=a(126),o=a(295),f=a.n(o),g=a(296),p=a.n(g),b=a(297),h=a.n(b),E=a(14),v=function(e){return d.a.createElement("div",{className:h.a.friend},d.a.createElement(E.b,{to:"/dialogs/"+e.id,activeClassName:h.a.activeLink},e.name))},_=function(e){var s=e.friends.map((function(e){return d.a.createElement(v,{name:e.name,key:e.id,id:e.id})}));return d.a.createElement("div",{className:p.a.friends},s)},j=a(298),M=a.n(j),O=a(299),x=a.n(O),k=function(e){return d.a.createElement("div",{className:x.a.message},e.message)},N=a(88),y=a(127),A=a(24),S=a(66),F=Object(S.a)(100),J=Object(y.a)({form:"addMessage"})((function(e){return d.a.createElement("form",{onSubmit:e.handleSubmit},d.a.createElement("div",null,d.a.createElement(N.a,{placeholder:"Write message",name:"messageText",component:A.b,validate:[S.b,F]})),d.a.createElement("div",null,d.a.createElement("button",null,"Send")))})),L=function(e){var s=e.messages.map((function(e){return d.a.createElement(k,{message:e.message,key:e.id,id:e.id})}));return d.a.createElement("div",{className:M.a.messages},d.a.createElement("div",null,s),d.a.createElement(J,{onSubmit:function(s){e.sendMessage(s.messageText)}}))},w=function(e){return d.a.createElement("div",{className:f.a.dialogs},d.a.createElement(_,{friends:e.friends}),d.a.createElement(L,{messages:e.messages,sendMessage:e.sendMessage}))},C=a(95),H=a(7),T=function(e){function s(){return Object(n.a)(this,s),Object(i.a)(this,Object(r.a)(s).apply(this,arguments))}return Object(c.a)(s,e),Object(t.a)(s,[{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement(w,{isAuth:this.props.isAuth,friends:this.props.friends,messages:this.props.messages,sendMessage:this.props.sendMessage}))}}]),s}(d.a.Component);s.default=Object(H.d)(Object(l.b)((function(e){return{friends:e.dialogs.friends,messages:e.dialogs.messages,isAuth:e.auth.isAuth}}),{sendMessage:u.b}),C.a)(T)}}]);
//# sourceMappingURL=3.e7154bdf.chunk.js.map