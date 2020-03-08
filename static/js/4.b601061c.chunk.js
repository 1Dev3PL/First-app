(this["webpackJsonpfirst-app"]=this["webpackJsonpfirst-app"]||[]).push([[4],{292:function(e,t,a){e.exports={picture:"ProfileInfo_picture__2dqFd",info:"ProfileInfo_info__1Yp8A",fullName:"ProfileInfo_fullName__2lhA9",contact:"ProfileInfo_contact__1k5zQ"}},293:function(e,t,a){e.exports={posts:"Posts_posts__11wDi",addPostButton:"Posts_addPostButton__36-5P"}},294:function(e,t,a){e.exports={item:"Post_item__3z9fn"}},300:function(e,t,a){"use strict";a.r(t);var n=a(28),r=a(29),l=a(31),o=a(30),s=a(32),i=a(0),u=a.n(i);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(i){r=!0,l=i}finally{try{n||null==s.return||s.return()}finally{if(r)throw l}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var m=a(292),f=a.n(m),p=a(94),d=a.n(p),b=function(e){var t=c(Object(i.useState)(!1),2),a=t[0],n=t[1],r=c(Object(i.useState)(e.status),2),l=r[0],o=r[1];Object(i.useEffect)((function(){o(e.status)}),[e.status]);return u.a.createElement("div",null,!a&&u.a.createElement("div",null,u.a.createElement("span",{onDoubleClick:function(){n(!0)}},u.a.createElement("b",null,"Status"),": ",e.status||"No Status")),a&&u.a.createElement("div",{onBlur:function(){n(!1),e.updateStatus(l)}},u.a.createElement("input",{onChange:function(e){o(e.currentTarget.value)},autoFocus:!0,value:l})))},E=a(49),v=a.n(E),h=a(24),P=a(127),O=Object(P.a)({form:"edit-profile"})((function(e){var t=e.handleSubmit,a=e.profile,n=e.error;return u.a.createElement("form",{onSubmit:t},u.a.createElement("div",null,u.a.createElement("button",null,"Save")),n&&u.a.createElement("div",{className:v.a.formSummaryError},n),u.a.createElement("div",null,u.a.createElement("b",null,"Full name"),": ",Object(h.c)("Full name","fullName",h.a,[])),u.a.createElement("div",null,u.a.createElement("b",null,"About me"),": ",Object(h.c)("About me","aboutMe",h.b,[])),u.a.createElement("div",null,u.a.createElement("b",null,"Looking for a job"),": ",Object(h.c)(null,"lookingForAJob",h.a,[],"checkbox")),u.a.createElement("div",null,u.a.createElement("b",null,"My professional skills"),": ",Object(h.c)("My Professional skills","lookingForAJobDescription",h.b,[])),u.a.createElement("div",null,u.a.createElement("b",null,"Contacts"),": ",Object.keys(a.contacts).map((function(e){return u.a.createElement("div",{className:f.a.contact,key:e},u.a.createElement("b",null,e),": ",Object(h.c)(e,"contacts.".concat(e),h.a,[]))}))))})),g=function(e){var t=e.profile,a=e.isOwner,n=e.toEditMode;return u.a.createElement("div",null,a&&u.a.createElement("div",null,u.a.createElement("button",{onClick:n},"Edit")),u.a.createElement("div",{className:f.a.fullName},t.fullName),u.a.createElement("div",null,u.a.createElement("b",null,"About me"),": ",t.aboutMe?t.aboutMe:" "),u.a.createElement("div",null,u.a.createElement("b",null,"Looking for a job"),": ",t.lookingForAJob?"yes":"no"),u.a.createElement("div",null,u.a.createElement("b",null,"My profesional skills"),": ",t.lookingForAJobDescription),u.a.createElement("div",null,u.a.createElement("b",null,"Contacts"),": ",Object.keys(t.contacts).map((function(e){return u.a.createElement(y,{key:e,contactTitle:e,contactValue:t.contacts[e]})}))))},y=function(e){var t=e.contactTitle,a=e.contactValue;return u.a.createElement("div",{className:f.a.contact},u.a.createElement("b",null,t),": ",a)},j=function(e){var t=e.profile,a=e.status,n=e.updateStatus,r=e.isOwner,l=e.savePhoto,o=e.saveProfile,s=c(Object(i.useState)(!1),2),m=s[0],p=s[1];return u.a.createElement("div",{className:f.a.info},u.a.createElement("img",{src:t.photos.large?t.photos.large:d.a,className:f.a.picture,alt:"userPhoto"}),r&&u.a.createElement("input",{type:"file",onChange:function(e){e.target.files.length&&l(e.target.files[0])}}),m?u.a.createElement(O,{initialValues:t,onSubmit:function(e){o(e).then((function(){p(!1)}))},profile:t}):u.a.createElement(g,{profile:t,isOwner:r,toEditMode:function(){p(!0)}}),u.a.createElement(b,{status:a,updateStatus:n}))},k=a(93),S=a(293),_=a.n(S),A=a(294),N=a.n(A),w=function(e){return u.a.createElement("div",{className:N.a.item},u.a.createElement("img",{src:d.a,alt:"userPhoto"}),e.message,u.a.createElement("div",null,e.likes," like"))},I=a(88),x=a(66),M=Object(x.a)(50),C=Object(P.a)({form:"addPost"})((function(e){return u.a.createElement("form",{onSubmit:e.handleSubmit},u.a.createElement("div",null,u.a.createElement(I.a,{placeholder:"Write post",name:"postText",component:h.b,validate:[x.b,M]})),u.a.createElement("div",null,u.a.createElement("button",{className:_.a.addPostButton},"Add Post")))})),F=u.a.memo((function(e){var t=e.posts.map((function(e){return u.a.createElement(w,{message:e.message,likes:e.likesCount,key:e.id,id:e.id})}));return u.a.createElement("div",{className:_.a.posts},u.a.createElement(C,{onSubmit:function(t){e.addPost(t.postText)}}),u.a.createElement("div",null,t))})),T=a(13),U=Object(T.b)((function(e){return{posts:e.profile.posts,newPostText:e.profile.newPostText}}),{addPost:k.a})(F),D=a(40),J=function(e){return e.profile?u.a.createElement("div",null,u.a.createElement(j,{profile:e.profile,status:e.status,updateStatus:e.updateStatus,isOwner:e.isOwner,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),u.a.createElement(U,null)):u.a.createElement(D.a,null)},B=a(25),V=a(95),z=a(7),L=function(e){function t(){return Object(n.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(r.a)(t,[{key:"refreshProfile",value:function(){var e=this.props.match.params.userId;e||(e=this.props.myId)||this.props.history.push("/login"),this.props.getUserProfile(e),this.props.getUserStatus(e)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(J,Object.assign({},this.props,{profie:this.props.profile,status:this.props.status,updateStatus:this.props.updateUserStatus,isOwner:!this.props.match.params.userId,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile})))}}]),t}(u.a.Component);t.default=Object(z.d)(Object(T.b)((function(e){return{profile:e.profile.profile,status:e.profile.status,myId:e.auth.userId,isAuth:e.auth.isAuth}}),{getUserProfile:k.c,getUserStatus:k.d,updateUserStatus:k.g,savePhoto:k.e,saveProfile:k.f}),B.g,V.a)(L)}}]);
//# sourceMappingURL=4.b601061c.chunk.js.map