(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"6xNN":function(t,s,e){"use strict";e.r(s),e.d(s,"EmailConfirmationModule",function(){return d});var i=e("PCNd"),a=e("2Vo4"),n=e("fXoL"),r=e("tyNb"),u=e("7dP1"),o=e("dNgK");let c=(()=>{class t{constructor(){}separateParagraphs(t){return t.split("\n")}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275prov=n.Ob({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var b=e("lxpx"),h=e("sYmb"),m=e("ofXK");function l(t,s){if(1&t&&(n.Yb(0,"p",4),n.Qc(1),n.Xb()),2&t){const t=s.$implicit;n.Fb(1),n.Rc(t)}}function p(t,s){if(1&t&&(n.Wb(0),n.Yb(1,"h2",2),n.Qc(2),n.oc(3,"translate"),n.Xb(),n.Oc(4,l,2,1,"p",3),n.Vb()),2&t){const t=n.nc();n.Fb(2),n.Rc(n.pc(3,2,"public.emailConfirmation.yourAccountHasBeenCreated")),n.Fb(2),n.vc("ngForOf",t.messageHTML)}}const g=[{path:"",component:(()=>{class t{constructor(t,s,e,i,a,n,r){this.route=t,this.router=s,this.authService=e,this.snackBar=i,this.textParserService=a,this.translationService=n,this.translate=r}ngOnInit(){this.isSubmitReady$=new a.a(!1),this.updateLang(),this.getUserEmail(),this.readRouteParameters(),this.autoSubmit()}ngOnDestroy(){this.messageHTMLSub&&this.messageHTMLSub.unsubscribe(),this.confirmationSub&&this.confirmationSub.unsubscribe(),this.messageTranslationSub&&this.messageTranslationSub.unsubscribe(),this.isReadySub&&this.isReadySub.unsubscribe(),this.langSub.unsubscribe(),this.userEmailSub.unsubscribe()}autoSubmit(){this.isReadySub=this.isSubmitReady$.subscribe(t=>{t&&(this.confirmationSub=this.authService.confirmEmail(this.token,this.userId).subscribe(t=>{this.messageTranslationSub=this.translate.get("public.emailConfirmation.confirmationMessage").subscribe(t=>{this.snackBar.open(t,"OK",{duration:8e3,panelClass:"dark-snackbar"})}),this.authService.setUserEmail(t.email),this.router.navigate(["/login"])}))})}readRouteParameters(){this.route.params.subscribe(t=>{const s=t.token,e=t.id;s&&(this.token=s,this.isSubmitReady$.next(!!this.token&&!!this.userId)),e&&(this.userId=e,this.isSubmitReady$.next(!!this.token&&!!this.userId))})}getUserEmail(){this.userEmailSub=this.authService.userEmail$.subscribe(t=>{this.userEmail=t,this.getMessageHTML()})}getMessageHTML(){this.messageHTMLSub=this.translate.get("public.emailConfirmation.confirmationEmailHasBeenSent",{email:this.userEmail}).subscribe(t=>this.messageHTML=this.textParserService.separateParagraphs(t))}updateLang(){this.translate.setDefaultLang(this.translationService.defaultLang),this.langSub=this.translationService.currentLang$.subscribe(t=>this.translate.use(t))}}return t.\u0275fac=function(s){return new(s||t)(n.Sb(r.a),n.Sb(r.b),n.Sb(u.a),n.Sb(o.a),n.Sb(c),n.Sb(b.a),n.Sb(h.d))},t.\u0275cmp=n.Mb({type:t,selectors:[["app-email-confirmation"]],decls:2,vars:1,consts:[[1,"h-full","mat-dark-elevation-z2"],[4,"ngIf"],[1,"text-center","py-5","text-white"],["class","ml-5 mat-emphasis-high",4,"ngFor","ngForOf"],[1,"ml-5","mat-emphasis-high"]],template:function(t,s){1&t&&(n.Yb(0,"div",0),n.Oc(1,p,5,4,"ng-container",1),n.Xb()),2&t&&(n.Fb(1),n.vc("ngIf",(!s.token||!s.userId)&&s.userEmail&&s.messageHTML))},directives:[m.m,m.l],pipes:[h.c],styles:[""]}),t})()}];let S=(()=>{class t{}return t.\u0275mod=n.Qb({type:t}),t.\u0275inj=n.Pb({factory:function(s){return new(s||t)},imports:[[r.c.forChild(g)],r.c]}),t})(),d=(()=>{class t{}return t.\u0275mod=n.Qb({type:t}),t.\u0275inj=n.Pb({factory:function(s){return new(s||t)},imports:[[i.b,S]]}),t})()}}]);