(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"3JDo":function(s,r,t){"use strict";t.r(r),t.d(r,"ResetPasswordModule",function(){return q});var e=t("PCNd"),a=t("94wA"),i=t("3Pt+"),o=t("fXoL"),n=t("tyNb"),c=t("dNgK"),b=t("lxpx"),u=t("sYmb"),d=t("7dP1"),p=t("Wp6s"),l=t("kmnG"),m=t("qFsG"),h=t("bTqV"),w=t("NFeN"),f=t("ofXK"),g=t("znSr");function F(s,r){1&s&&(o.Yb(0,"mat-error"),o.Qc(1),o.oc(2,"translate"),o.Xb()),2&s&&(o.Fb(1),o.Sc("",o.pc(2,1,"public.login.error.password.required")," "))}const v=function(s){return{minPw:s}};function P(s,r){if(1&s&&(o.Yb(0,"mat-error"),o.Qc(1),o.oc(2,"translate"),o.Xb()),2&s){const s=o.nc();o.Fb(1),o.Sc("",o.qc(2,1,"public.register.passwordMinLength",o.Ac(4,v,s.minPw))," ")}}function S(s,r){1&s&&(o.Yb(0,"mat-error"),o.Qc(1),o.oc(2,"translate"),o.Xb()),2&s&&(o.Fb(1),o.Sc("",o.pc(2,1,"public.login.error.password.required")," "))}function X(s,r){1&s&&(o.Yb(0,"mat-error"),o.Qc(1),o.oc(2,"translate"),o.Xb()),2&s&&(o.Fb(1),o.Sc(" ",o.pc(2,1,"public.register.passwordsNoMatch"),""))}const y=function(s,r){return{"mat-color-primary text-white":s,"color-grey":r}},Y=[{path:"",component:(()=>{class s{constructor(s,r,t,e,a,i,o){this.route=s,this.fb=r,this.router=t,this.snackBar=e,this.translationService=a,this.translate=i,this.authService=o,this.hidePass1=!0,this.hidePass2=!0,this.minPw=8}get password1(){return this.passwordForm.get("password1")}get password2(){return this.passwordForm.get("password2")}ngOnInit(){this.updateLang(),this.initForm(),this.readRouteParameters()}ngOnDestroy(){this.langSub.unsubscribe(),this.messageTranslationSub&&this.messageTranslationSub.unsubscribe()}submit(){this.token&&this.authService.resetPassword(this.passwordForm).subscribe(s=>{this.router.navigate(["/login"]),this.authService.setUserEmail(s.email),this.messageTranslationSub=this.translate.get("public.reset-password.success").subscribe(s=>{this.snackBar.open(s,"OK",{duration:8e4,panelClass:"dark-snackbar"})})},s=>this.passwordForm.reset())}triggerSubmit(s){s.preventDefault(),this.passwordForm.valid&&this.submit()}onPasswordInput(){this.passwordForm.hasError("passwordsNotEqual")?this.password2.setErrors([{passwordsNotEqual:!0}]):this.password2.setErrors(null)}readRouteParameters(){this.route.params.subscribe(s=>{const r=s.token,t=s.id;r&&(this.token=r,this.passwordForm.addControl("token",new i.e(this.token,[i.u.required]))),t&&(this.userId=t,this.passwordForm.addControl("id",new i.e(this.userId,[i.u.required])))})}initForm(){this.passwordForm=this.fb.group({password1:["",[i.u.required,i.u.minLength(this.minPw)]],password2:["",[i.u.required,i.u.minLength(this.minPw)]]},{validators:a.a})}updateLang(){this.translate.setDefaultLang(this.translationService.defaultLang),this.langSub=this.translationService.currentLang$.subscribe(s=>this.translate.use(s))}}return s.\u0275fac=function(r){return new(r||s)(o.Sb(n.a),o.Sb(i.d),o.Sb(n.b),o.Sb(c.a),o.Sb(b.a),o.Sb(u.d),o.Sb(d.a))},s.\u0275cmp=o.Mb({type:s,selectors:[["app-reset-password"]],decls:34,vars:32,consts:[[1,"mat-dark-elevation-z2","h-full"],[1,"text-center","display-4","py-4","py-sm-5","text-white"],[1,"container"],[1,"col-10","col-sm-9","col-md-6","mx-auto","mb-3","mb-md-0"],[3,"formGroup","ngSubmit"],["appearance","fill",1,"w-100","my-3"],["matInput","",3,"formControl","type","keydown.enter","input"],["mat-icon-button","","matSuffix","",3,"click"],[4,"ngIf"],["appearance","fill",1,"w-100","mb-3"],[1,"text-center"],["type","submit","mat-raised-button","",3,"disabled","ngClass","click"]],template:function(s,r){1&s&&(o.Yb(0,"div",0),o.Yb(1,"h1",1),o.Qc(2),o.oc(3,"translate"),o.Xb(),o.Yb(4,"div",2),o.Yb(5,"div",3),o.Yb(6,"mat-card"),o.Yb(7,"mat-card-content"),o.Yb(8,"form",4),o.jc("ngSubmit",function(){return r.submit()}),o.Yb(9,"mat-form-field",5),o.Yb(10,"mat-label"),o.Qc(11),o.oc(12,"translate"),o.Xb(),o.Yb(13,"input",6),o.jc("keydown.enter",function(s){return r.triggerSubmit(s)})("input",function(){return r.onPasswordInput()}),o.Xb(),o.Yb(14,"button",7),o.jc("click",function(){return r.hidePass1=!r.hidePass1}),o.Yb(15,"mat-icon"),o.Qc(16),o.Xb(),o.Xb(),o.Oc(17,F,3,3,"mat-error",8),o.Oc(18,P,3,6,"mat-error",8),o.Xb(),o.Yb(19,"mat-form-field",9),o.Yb(20,"mat-label"),o.Qc(21),o.oc(22,"translate"),o.Xb(),o.Yb(23,"input",6),o.jc("keydown.enter",function(s){return r.triggerSubmit(s)})("input",function(){return r.onPasswordInput()}),o.Xb(),o.Yb(24,"button",7),o.jc("click",function(){return r.hidePass2=!r.hidePass2}),o.Yb(25,"mat-icon"),o.Qc(26),o.Xb(),o.Xb(),o.Oc(27,S,3,3,"mat-error",8),o.Oc(28,X,3,3,"mat-error",8),o.Xb(),o.Xb(),o.Xb(),o.Yb(29,"mat-card-actions"),o.Yb(30,"p",10),o.Yb(31,"button",11),o.jc("click",function(){return r.submit()}),o.Qc(32),o.oc(33,"translate"),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb()),2&s&&(o.Fb(2),o.Rc(o.pc(3,21,"public.forgot-password.resetPassword")),o.Fb(6),o.vc("formGroup",r.passwordForm),o.Fb(3),o.Rc(o.pc(12,23,"public.login.password")),o.Fb(2),o.vc("formControl",r.password1)("type",r.hidePass1?"password":"text"),o.Fb(1),o.Gb("aria-label","hide password")("aria-pressed",r.hidePass1),o.Fb(2),o.Rc(r.hidePass1?"visibility_off":"visibility"),o.Fb(1),o.vc("ngIf",r.password1.hasError("required")),o.Fb(1),o.vc("ngIf",r.password1.hasError("minlength")),o.Fb(3),o.Rc(o.pc(22,25,"public.register.passwordConfirm")),o.Fb(2),o.vc("formControl",r.password2)("type",r.hidePass2?"password":"text"),o.Fb(1),o.Gb("aria-label","hide password")("aria-pressed",r.hidePass2),o.Fb(2),o.Rc(r.hidePass2?"visibility_off":"visibility"),o.Fb(1),o.vc("ngIf",r.password2.hasError("required")),o.Fb(1),o.vc("ngIf",r.password2.invalid&&!r.password2.hasError("required")),o.Fb(3),o.vc("disabled",!r.passwordForm.valid)("ngClass",o.Bc(29,y,r.passwordForm.valid,!r.passwordForm.valid)),o.Fb(1),o.Sc(" ",o.pc(33,27,"actions.UPDATE")," "))},directives:[p.a,p.d,i.w,i.p,i.h,l.c,l.g,m.a,i.b,i.o,i.f,h.a,l.i,w.a,f.m,p.b,f.k,g.a,l.b],pipes:[u.c],styles:[""]}),s})()}];let k=(()=>{class s{}return s.\u0275mod=o.Qb({type:s}),s.\u0275inj=o.Pb({factory:function(r){return new(r||s)},imports:[[n.c.forChild(Y)],n.c]}),s})(),q=(()=>{class s{}return s.\u0275mod=o.Qb({type:s}),s.\u0275inj=o.Pb({factory:function(r){return new(r||s)},imports:[[e.b,k]]}),s})()}}]);