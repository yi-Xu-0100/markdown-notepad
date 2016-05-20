/*! markdown-notepad v0.1.0 2016-05-21 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):window.jQuery&&a(window.jQuery)}(function(a){var b=function(b,c){var d=this,e=a(b);d._el=b,d._opt=c,d._type=0,d._which=0,d._locales=e.data("locales").split(","),e.on("show.bs.modal",a.proxy(d._show,d)).on("hidden.bs.modal",a.proxy(d._hidden,d)).on("shown.bs.modal",a.proxy(d._shown,d)).on("click",".modal-footer .btn",a.proxy(d._click,d))};b.prototype={alert:function(b,c){var d=this,e=d._el,f=d._locales;a(".modal-title",e).text(c||f[0]),a(".modal-body p",e).html(b),d._type=1,a(e).modal("show")},confirm:function(b,c,d){var e=this,f=e._el,g=e._locales;e._type=3,e._callback=c,a(".modal-title",f).text(d||g[1]),a(".modal-body p",f).html(b),a(f).modal("show")},prompt:function(b,c,d,e){var f=this,g=f._el,h=f._locales;f._type=4,f._callback=c,a(".modal-title",g).text(d||h[2]),a(".modal-body label",g).text(e||""),a(".modal-body input",g).val(b),a(g).modal("show")},_show:function(){var b=this;1===(1&b._type)?a(".modal-body p",b._el).removeClass("hidden"):a(".modal-body p",b._el).addClass("hidden"),1===b._type?a(".modal-footer",b._el).addClass("hidden"):a(".modal-footer",b._el).removeClass("hidden"),4===(4&b._type)?(a(".modal-body .form-group",b._el).removeClass("hidden"),a(".modal-footer .btn[data-which=-1]",b._el).addClass("hidden")):(a(".modal-body .form-group",b._el).addClass("hidden"),a(".modal-footer .btn[data-which=-1]",b._el).removeClass("hidden"))},_shown:function(){var b=this;4===(4&b._type)&&a(".modal-body input",b._el).focus()},_hidden:function(){var b=this,c=b._el;if("function"==typeof b._callback){var d;4===(4&b._type)&&(d=a(".modal-body input",c).val()),b._callback(b._which,d)}b._which=0,delete b._callback},_click:function(b){var c=this,d=a(b.target),e=d.data("which");c._which=e}},a.fn.msgbox=function(c){var d=arguments;return this.each(function(){var e=a(this),f=e.data("msgbox"),g="object"==typeof c?c:{};f||"string"==typeof c?"string"==typeof c&&f[c].apply(f,Array.prototype.slice.call(d,1)):e.data("msgbox",new b(this,g))})}});/*! markdown-notepad v0.1.0 2016-05-21 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):window.jQuery&&a(window.jQuery)}(function(a){var b=function(a,b){var c=this;c._el=a,c._opt=b};b.prototype={constructor:b,data:function(a){var b=this,c=b._opt;return a?void c.data(a):c.data()}},a.fn.ntadapter=function(c){var d=arguments;return this.each(function(){var e=a(this),f=e.data("ntadapter"),g="object"==typeof c?c:{};f||"string"==typeof c?"string"==typeof c&&f[c].apply(f,Array.prototype.slice.call(d,1)):e.data("ntadapter",new b(this,g))})}});/*! markdown-notepad v0.1.0 2016-05-21 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery","js-shortid"],a):"object"==typeof exports?a(require("jquery"),require("js-shortid")):window.jQuery&&a(window.jQuery,window.shortid||{gen:function(){for(var a=(new Date).getTime();a===(new Date).getTime(););return(new Date).getTime()}})}(function(a,b){var c=function(b,c){var d=this;d._el=b,d._opt=c,d._seq=1,d._msgbox=c.msgbox;var e=a(b).on("click","a",a.proxy(d._selectTab,d)),f=a(".notes-tab-menu",e.parent());f.length>0&&(d._ctxMenu=f[0],e.on("contextmenu","li[data-note-uid]",a.proxy(d._contextmenu,d)),f.on("click","a",a.proxy(d._ctxMenuClick,d)))};c.prototype={constructor:c,create:function(c,d){var e=this,f=a(e._el),g=c;a.isArray(c)||(g=[c]);for(var h=0;h<g.length;h++)g[h].uid||(g[h].uid=b.gen()),f.trigger("create.bs.tab",g[h]),e._create(g[h],d)},_create:function(b,c){var d=this,e=d.activeUid(),f=a(d._el),g=a('<li data-note-uid="'+b.uid+'"><a href="#" data-toggle="tab" title="'+(b.path||b.name)+'"><i class="glyphicon glyphicon-file '+(b.unsaved?"text-danger":"")+'"></i>&nbsp;<span>'+b.name+'</span><button class="btn btn-default btn-xs" aria-label="Close">&times;</button></a></li>').insertBefore(a("li",f).last());f.trigger("created.bs.tab",[b]),c&&a("a",g).tab("show"),d.lastuid=e},_close:function(b){var c=this,d=a(c._el),e=c.activeUid(),f=b.data("note-uid");b.remove(),d.trigger("closed.bs.tab",[f]),e===f&&(c.lastuid&&c.lastuid!==e?a("li[data-note-uid="+c.lastuid+"] a",d).tab("show"):a("li[data-note-uid]:first a",d).tab("show")),c.lastuid=null},closeAll:function(){var b=this,c=b._el,d=a("li[data-note-uid]",c),e=a(b._msgbox).data("msgbox");e.confirm("Are you sure to close all?",function(c){switch(c){case 1:d.each(function(){b._close(a(this))})}})},closeOthers:function(b){var c=this,d=c._el,e=null,f=a(c._msgbox).data("msgbox");e=b?a('li[data-note-uid]:not([data-note-uid="'+b+'"])',d):a("li[data-note-uid]:not(.active)",d),f.confirm("Are you sure to close others?",function(b){switch(b){case 1:e.each(function(){c._close(a(this))})}})},activeUid:function(){return a("li.active",this._el).data("note-uid")},_selectTab:function(b){var c=this,d=a(b.target),e=a(b.currentTarget),f=e.parent(),g=f.data("note-uid");return d.is(".btn")?(b.preventDefault(),void c._evalClose(g)):void(null!=g&&void 0!==g&&-1!==g?c.selectTab(g):c.createUntitled())},selectTab:function(b){var c=this,d=a(c._el),e=b.uid||b,f=a("li[data-note-uid="+e+"]",d),g=c.activeUid();e!==g&&(f.tab("show"),d.trigger("selected.bs.tab",[e]),c.lastuid=g)},open:function(b,c){var d=this,e=d._el,f=a("li[data-note-uid="+b.uid+"]",e);0===f.size()&&(f=d.createTag(b)),void 0!==c&&null!=c&&c!==!1||a("a",f).tab("show")},_evalClose:function(b){var c=this,d=a(c._el);d.trigger("close.bs.tab",[b]);var e=a._data(c._el,"events").close;void 0!==e&&0!==e.length||c.close(b)},close:function(b){var c=this,d=c._el,e=b?a("li[data-note-uid="+(b.uid||b)+"]",d):a("li.active",d);c._close(e)},doRename:function(b){var c=this,d=c._el,e=b?a("li[data-note-uid="+b.uid+"]",d):a("li.active",d);a("span",e).text(b.name)},rename:function(b){var c=this,d=b||a("li.active",c._el),e=d.data("note-uid"),f=a(c._msgbox).data("msgbox");"undefined"!=typeof chrome&&chrome.fileSystem?a(c._el).trigger("rename.bs.tab",[e]):f.prompt(a("span",d).text(),function(b,d){a(c._el).trigger("rename.bs.tab",[e,d,b])},"Rename","File Name")},createUntitled:function(){var a=this,b={name:"Untitled"+a._seq};return a.create(b,!0),a._seq++,b},markUnsaved:function(b,c){var d=this,e=d._el,f=null;if(c){var g=c.uid||c;f=a('li[data-note-uid="'+g+'"] i',e)}else f=a("li.active i",e);b?f.is(".text-danger")&&f.removeClass("text-danger"):f.is(".text-danger")||f.addClass("text-danger")},_contextmenu:function(b){var c=this,d=b.clientX||b.offsetX||b.layerX,e=b.clientY||b.offsetY||b.layerY;a(c._ctxMenu).css({display:"block",left:d,top:e}).show(),c._ctxItem=b.currentTarget,b.preventDefault(),b.stopPropagation()},_ctxMenuClick:function(b){a(b.delegateTarget).hide();var c=this,d=a(b.target),e=d.data("nts-cmd"),f=a(c._ctxItem),g=f.data("note-uid");switch(e){case"close":c._evalClose(g);break;case"closeOthers":c.closeOthers(g);break;case"closeAll":c.closeAll();break;case"rename":c.rename(f)}},hideCtxMenu:function(){var b=this;b._ctxMenu&&a(b._ctxMenu).hide()},count:function(){return a("li[data-note-uid]",this._el).size()}},a.fn.notestab=function(b){var d=arguments;return this.each(function(){var e=this,f=a(e),g=f.data("notestab"),h="object"==typeof b?b:{};g||"string"==typeof b?"string"==typeof b&&g[b].apply(g,Array.prototype.slice.call(d,1)):f.data("notestab",new c(e,a.extend(h,f.data())))})},a(document).on("click",function(){a(".notes-tab").notestab("hideCtxMenu")})});/*! markdown-notepad v0.1.0 2016-05-21 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):window.jQuery&&a(window.jQuery)}(function(a){function b(a,b){var c=document.createElement("a");if(c.setAttribute("href",a),c.setAttribute("download",b),document.createEvent){var d=document.createEvent("MouseEvents");d.initEvent("click",!0,!0),c.dispatchEvent(d)}else c.click()}var c=function(){};c.prototype={get:function(a,b){if("undefined"!=typeof chrome&&chrome.storage)chrome.storage.local.get(a,b);else{var c=null;window.localStorage&&(c=window.localStorage.getItem(a)),"function"==typeof b&&b(c)}},set:function(a,b,c){if("undefined"!=typeof chrome&&chrome.storage){var d={};d[a]=b,chrome.storage.local.set(d)}else window.localStorage&&window.localStorage.setItem(a,b),"function"==typeof c&&c()}};var d=new c,e=function(a){this._opt=a,this._d={}};e.prototype={constructor:e,setItem:function(a,b){var c=this;b?c._d[a]=b:delete c._d[a]},getItem:function(a){return this._d[a]},save:function(a){var b=this,c=b._opt;for(var e in b._d){var f=b._d[e];"object"!=typeof f||f.d||delete b._d[e]}d.set(c.id,JSON.stringify(b._d),a)},load:function(b){var c=this,e=c._opt;d.get(e.id,function(d){d&&"string"==typeof d[e.id]&&(c._d=a.parseJSON(d[e.id])),"function"==typeof b&&b(c._d)})},find:function(a){var b=this,c=b._d;for(var d in c)if(a(c[d],d))return c[d]}};var f=function(b,c){var d=this;d._el=b,d._opt=c,d._msgbox=c.msgbox,d._adapter=c.adapter,d._autoSaveInterval=c.autoSaveInterval||6e5,d._initTime=(new Date).getTime(),d._store=new e({id:c.id||"__notes"});var f=a(".notes-tab",b).notestab({msgbox:c.msgbox}).on("closed.bs.tab",a.proxy(d._tabClosed,d)).on("close.bs.tab",a.proxy(d._tabClose,d)).on("selected.bs.tab",a.proxy(d._tabSelected,d)).on("created.bs.tab",a.proxy(d._tabCreated,d)).on("shown.bs.tab",a.proxy(d._tabShown,d)).on("rename.bs.tab",a.proxy(d._tabRename,d));d._notestab=f[0],d._store.load(function(b){var c=[];for(var e in b)"__ctxUid"===e?d._ctxUid=b[e]:c[c.length]=b[e];c.length>0?(f.notestab("create",c),d._ctxUid?a("a",a("li[data-note-uid="+d._ctxUid+"]",f)).tab("show"):a("a",a("li:first",f)).tab("show")):f.notestab("createUntitled")}),a(d._adapter).on("edit.ntadapter",a.proxy(d._edit,d)),a(b).on("click","a[data-nts-cmd], button[data-nts-cmd]",a.proxy(d._cmd,d)),setInterval(function(){d.save2LocalStore()},d._autoSaveInterval)};f.prototype={constructor:f,_edit:function(b,c){var d=this,e=d.note(d._ctxUid);e&&e.d!==c&&(e.unsaved=!0,e.d=c||a(d._adapter).data("ntadapter").data(),a(d._notestab).notestab("markUnsaved",!1,e))},_tabClose:function(a,b){var c=this;c.close(b)},_tabClosed:function(b,c){var d=this,e=d._store,f=a(d._notestab).data("notestab"),g=d.note(c);g&&delete g.d,0===f.count()&&(a(d._adapter).ntadapter("data",g),f.createUntitled()),e.setItem(c)},_tabSelected:function(b,c){var d=this,e=d.note(c);d._ctxUid=c,a(d._adapter).ntadapter("data",e)},_tabCreated:function(b,c){var d=this,e=a(d._notestab).data("notestab");if(e.count()>1){var f=d.note(d._ctxUid);!f||f.unsaved||f.d||0!==f.name.indexOf("Untitled")||e.close(f.uid)}d.note(c.uid,c),a(d._adapter).ntadapter("data",c)},_tabShown:function(b){var c=this,d=a(b.target).parent().data("note-uid");c._ctxUid=d,a(c._adapter).ntadapter("data",c.note(d))},_tabRename:function(b,c,d){var e=this,f=e.note(c);d?(f.name=d,a(e._notestab).notestab("doRename",f)):"undefined"!=typeof chrome&&chrome.storage&&chrome.fileSystem.restoreEntry(f.savedId,function(a){e._chromeSaveAs(f.name,f.d,e._chromeSaved(f,function(){a.remove(function(){console.log("removed")})}))})},_cmd:function(b){var c=this,d=a(b.currentTarget).data("nts-cmd"),e=a(c._notestab),f=e.data("notestab"),g=c.activeFile();switch(d){case"save":c.saveLocal();break;case"saveas":c.saveLocal({uid:g.uid,name:g.name,d:g.d},function(a){c.note(a.uid,a)});break;case"new":a(c._notestab).notestab("createUntitled");break;case"open":c.open();break;case"close":c.close();break;case"closeOthers":f.closeOthers(g.uid);break;case"closeAll":f.closeAll();break;case"rename":f.rename();break;case"shutdown":c.save2LocalStore(),chrome&&chrome.app&&chrome.app.window.current().close();break;case"maximize":chrome&&chrome.app&&(chrome.app.window.current().isMaximized()?chrome.app.window.current().restore():chrome.app.window.current().maximize());break;case"minimize":chrome&&chrome.app&&chrome.app.window.current().minimize();break;default:a(c._el).trigger("cmd.nts",[d])}},note:function(a,b){var c=this,d=c._store;return b?void d.setItem(a,b):d.getItem(a)},open:function(){var b=this;b.openLocal(function(c){a(b._notestab).notestab("create",c,!0)})},_chromeReadFile:function(b,c){var d=this,e=d._store;return function(f){chrome.fileSystem.getDisplayPath(c,function(g){var h=e.find(function(a){return console.log(a.path),g===a.path});if(h)a(d._notestab).notestab("selectTab",h);else{var i=chrome.fileSystem.retainEntry(c);d._readFile(f,function(a){b({name:c.name,d:a.target.result,path:g,savedId:i})})}})}},openLocal:function(b){var c=this,d=a(c._msgbox).data("msgbox");chrome&&chrome.fileSystem?chrome.fileSystem.chooseEntry({type:"openFile",acceptsMultiple:!0},function(a){if(!chrome.runtime.lastError&&a)for(var e=function(a){d.alert(a)},f=0;f<a.length;f++)a[f].file(c._chromeReadFile(b,a[f]),e)}):a('<input type="file" name="file" multiple />').on("change",a.proxy(c._loadLocal,c)).on("load",function(c,d,e,f){b({name:f[e].name,d:d}),e===f.length-1&&a(c.target).remove()}).click()},openRemote:function(b){var c=this,d=b.url||b||prompt("Remote URL:","http://");if(d){var e=document.createElement("a");e.href=d;var f=e.pathname.split("/").pop(),g={name:f,d:"> Loading...",readOnly:!0};"string"!=typeof b&&(g=a.extend(g,b)),a(c._notestab).notestab("create",g,!0),a.ajax({url:d,success:function(b){g.d=b,a(c._adapter).ntadapter("data",g)},error:function(b,d,e){g.d="> Load failure!!!\n"+(d||e),a(c._adapter).ntadapter("data",g)}})}},close:function(b){var c=this,d=a(c._notestab).data("notestab"),e=c.note(b||d.activeUid()),f=a(c._msgbox).data("msgbox");e&&!e.unsaved?d.close(b):f.confirm('Save file "'+e.name+'"?',function(a){switch(a){case 1:c.saveLocal(e),d.close(b);break;case-1:d.close(b)}},"Save")},saveLocal:function(c,d){var e=this,f=e._opt,g="."+(f.suffix||"txt"),h=a(e._notestab).data("notestab"),i=c||e.note(h.activeUid());if(e.save2LocalStore(),i){var j=i.d||"",k=i.name;if(k+=-1===k.lastIndexOf(".")?g:"","undefined"!=typeof chrome&&chrome.fileSystem)i.savedId?chrome.fileSystem.isRestorable(i.savedId,function(b){b?chrome.fileSystem.restoreEntry(i.savedId,function(b){b&&e._chromeWriteFile(b,j,function(){i.unsaved=!1,a(e._notestab).notestab("markUnsaved",!0)})}):e._chromeSaveAs(k,j,e._chromeSaved(i,d))}):e._chromeSaveAs(k,j,e._chromeSaved(i,d));else{if(window.saveAs)window.saveAs(new Blob([j],{type:f.mime||"text/plain"}),k);else if(navigator.msSaveBlob)navigator.msSaveBlob(new Blob([j],{type:f.mime||"text/plain"}),k);else{var l="data:"+(f.mime||"text/plain")+";charset=utf-8,"+encodeURIComponent(j);b(l,k)}a(e._notestab).notestab("markUnsaved",!0)}}},_chromeSaved:function(b,c){var d=this;return function(e){b.savedId=chrome.fileSystem.retainEntry(e),b.path=e.fullPath,b.name=e.name,b.unsaved=!1,a(d._notestab).notestab("markUnsaved",!0).notestab("doRename",b),"function"==typeof c&&c(b,e)}},_chromeWriteFile:function(a,b,c){var d=this,e=d._opt;a.createWriter(function(d){var f=!1;d.onwriteend=function(){return f?void("function"==typeof c&&c(a)):(f=!0,void this.truncate(this.position))},d.write(new Blob([b],{type:e.mime||"text/plain"}))},function(a){console.log(a)})},_chromeSaveAs:function(a,b,c){var d=this;chrome.fileSystem.chooseEntry({type:"saveFile",suggestedName:a},function(a){!chrome.runtime.lastError&&a&&d._chromeWriteFile(a,b,c)})},_noteLoad:function(a,b,c){return function(d){var e=d.target.result;c.trigger("load",[e,a,b])}},_loadLocal:function(b){for(var c=this,d=a(b.target),e=d[0].files,f=0;f<e.length;f++){var g=e.item(f);c._readFile(g,a.proxy(c._noteLoad,c)(f,e,d))}},_readFile:function(a,b){var c=new FileReader;c.onload=b,/\.(txt|md|js|xml|html|json)$/i.test(a.name)?c.readAsText(a):c.readAsDataURL(a)},save2LocalStore:function(){var a=this;if(a._ctxUid){var b=a.note(a._ctxUid);b&&b.d&&a._store.setItem("__ctxUid",a._ctxUid)}a._store.save()},_localStorage:function(){return d},hotkey:function(b){var c=this,d=a(c._notestab),e=!1;if(b.ctrlKey)switch(b.which){case 84:d.notestab("createUntitled"),e=!0;break;case 79:c.open(),e=!0;break;case 83:c.saveLocal(),e=!0;break;case 87:c.close(),e=!0;break;case 116:}e&&(b.preventDefault(),b.stopPropagation())},activeFile:function(){var b=this,c=a(b._notestab).data("notestab");return b.note(c.activeUid())}},a.fn.notes=function(b){var c=arguments;return this.each(function(){var d=a(this),e=d.data("notes"),g="object"==typeof b?b:{};e||"string"==typeof b?"string"==typeof b&&e[b].apply(e,Array.prototype.slice.call(c,1)):d.data("notes",new f(this,g))})}});/*! markdown-notepad v0.1.0 2016-05-21 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery","showdown"],a):"object"==typeof exports?a(require("jquery"),require("showdown")):window.jQuery&&a(window.jQuery,showdown)}(function(a,b){var c=function(c,d){var e=this;e._el=c,e._opt=d;var f=new b.Converter({strikethrough:!0,tables:!0}),g={};e._converter=f,e._adapter=a("textarea",c).ntadapter({data:a.proxy(e._data,e)}).markdown({language:d.locale,autofocus:!1,parser:function(b){var c=/\ssrc=('|")?(\S+\.(png|jpg|gif|jpeg|svg))\1/gi,d=f.makeHtml(b).replace(c,function(a,b,c){var d="img/image-96x96.png";return g[c]?d=g[c]:g[c]="",' src="'+d+'" data-src="'+c+'"'}),h=function(b,c){return function(){var d=URL.createObjectURL(b.response);g[c]=d,a('img[data-src="'+c+'"]',e._el).prop("src",d)}};for(var i in g){var j=new XMLHttpRequest;j.open("GET",i),j.responseType="blob",j.onload=h(j,i),j.send()}return d},onChange:a.proxy(e._change,e),additionalButtons:[[{name:"groupCustom",data:[{name:"cmdLocalImg",toggle:!0,title:d.lblLocalimg||"Local Image",icon:"glyphicon glyphicon-picture",btnText:d.lblLocalimg||"Local",callback:function(){a(e._el).notes("openLocal",function(a){e.insertImage(a.name,a.d)})}}]}]]})[0],a(c).notes({adapter:e._adapter,suffix:"md",mime:"text/markdown",msgbox:d.msgbox}).on("cmd.nts",a.proxy(e._cmd,e))};c.prototype={constructor:c,_change:function(){var b=this,c=a(b._adapter);c.trigger("edit.ntadapter",c.data("markdown").getContent())},_data:function(b){var c=this,d=a(c._adapter).data("markdown");return b?(d.setContent(b.d||""),b.d=d.getContent(),b.readOnly?(d.hidePreview(),d.showPreview()):d.$isPreview&&b.d&&!b.unsaved?(d.hidePreview(),d.showPreview()):d.hidePreview(),void 0):d.getContent()},preview:function(){var b=this,c=a(b._adapter).data("markdown"),d=c.$isPreview;d?c.hidePreview():c.showPreview()},save2LocalStore:function(){var b=this;a(b._el).notes("save2LocalStore")},insertImage:function(b,c){var d,e,f=this,g=f._opt,h=a(f._adapter).data("markdown"),i=h.getSelection();d=g.imgNotRef?"!["+b+"]("+c+")":"!["+b+"][]",h.replaceSelection(d),g.imgNotRef||h.setContent(h.getContent()+"\n ["+b+"]: "+c),e=i.start,h.setSelection(e,e+d.length)},_cmd:function(b,c){var d=this,e=d._el;switch(c){case"print":d.print();break;case"export":var f=a(e).data("notes"),g=f.activeFile(),h=d._converter;g&&f.saveLocal({d:h.makeHtml(g.d),name:g.name.replace(/([^\.]+)(\.\w+)?$/i,"$1.html")})}},print:function(){var b=this,c=b._opt,d=a(c.print),e=b._printContent();e&&(d.html(b._printContent()),window.print())},_printContent:function(){var b=this,c=b._el,d=a(b._adapter).data("markdown"),e=d.$isPreview;return e?a(".md-preview",c).html():"<pre>"+d.getContent()+"</pre>"}},a.fn.mdnotepad=function(b){var d=arguments;return this.each(function(){var e=a(this),f=e.data("mdnotepad"),g="object"==typeof b?b:{};f||"string"==typeof b?"string"==typeof b&&f[b].apply(f,Array.prototype.slice.call(d,1)):e.data("mdnotepad",new c(this,a.extend(g,e.data())))})},a(document).ready(function(){var b=a(".notes").mdnotepad({msgbox:a("#myMsgBox").msgbox()[0],print:a(".notes-print")[0]}),c=b.data("notes"),d=b.height();a(document).on("click","a",function(c){var d=a(c.currentTarget)[0],e=d.href,f=d.pathname.split("/").pop(),g=f.lastIndexOf("."),h=-1!==g?f.substring(g+1).toLowerCase():null;h&&/(md|markdown|txt|text|json)$/i.test(h)?(b.notes("openRemote",e),c.preventDefault()):d.pathname!==window.location.pathname&&"_self"!==d.target&&(d.target="_blank")}),a(".md-editor textarea",b).height(d-a(".md-editor textarea",b).offset().top-1);var e="0.1.0",f=c._localStorage();f.get("__ver",function(c){e!==c.__ver&&(f.set("__ver",e),a("a[name=welcome]",b).click())});var g=a(window).on("keydown",function(b){switch(b.which){case 116:a(".notes").mdnotepad("preview"),b.preventDefault(),b.stopPropagation();break;case 80:b.ctrlKey&&(a(".notes").mdnotepad("print"),b.preventDefault(),b.stopPropagation());break;default:a(".notes").notes("hotkey",b)}}).on("paste",function(b){var c=b.originalEvent,d=(c.clipboardData||c.originalEvent.clipboardData).items,e=null;if(d){for(var f=0;f<d.length;f++)0===d[f].type.indexOf("image")&&(e=d[f].getAsFile());if(null!==e){var g=new FileReader;g.onload=function(b){a(".notes").mdnotepad("insertImage",(new Date).getTime(),b.target.result)},g.readAsDataURL(e)}}}).on("resize",function(){var b=a(".notes"),c=b.width(),d=b.height();a(".md-editor textarea",b).height(d-72-50),a(".md-editor .md-preview",b).css({height:d-a(".md-editor .md-preview",b).offset().top-1,width:c})});"undefined"!=typeof chrome&&chrome.storage||g.on("beforeunload",function(){return window.localStorage?void a(".notes").mdnotepad("save2LocalStore"):"Do you really want to close?"})})});