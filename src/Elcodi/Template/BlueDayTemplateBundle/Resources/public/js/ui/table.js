!function(a){function b(a,b,c,d){for(var e="",f=0,g=c.length;g>f;f++)e+=d(c[f],b);return"<tr>"+e+"</tr>"}function c(a,b){var c=a.attributeWriter(b),d="<td";return(a.hidden||a.textAlign)&&(d+=' style="',a.hidden&&(d+="display: none;"),a.textAlign&&(d+="text-align: "+a.textAlign+";"),d+='"'),d+">"+c+"</td>"}function d(a){return a[this.id]}function e(b){return a(b).html()}function f(b,c){this.update=function(){var d="",e=c.table.columns,f=c.writers._rowWriter,g=c.writers._cellWriter;b.$element.trigger("dynatable:beforeUpdate",d);for(var h=0,i=c.dataset.records.length;i>h;h++){var j=c.dataset.records[h],k=f(h,j,e,g);d+=k}if(c.features.recordCount&&a("#dynatable-record-count-"+b.element.id).replaceWith(b.recordsCount.create()),c.features.paginate&&(a("#dynatable-pagination-links-"+b.element.id).replaceWith(b.paginationLinks.create()),c.features.perPageSelect&&a("#dynatable-per-page-"+b.element.id).val(parseInt(c.dataset.perPage))),c.features.sort&&e){b.sortsHeaders.removeAllArrows();for(var h=0,i=e.length;i>h;h++){var l=e[h],m=w.allMatch(c.dataset.sorts,l.sorts,function(a,b){return b in a}),n=c.dataset.sorts[l.sorts[0]];m&&b.$element.find('[data-dynatable-column="'+l.id+'"]').find(".dynatable-sort-header").each(function(){1==n?b.sortsHeaders.appendArrowUp(a(this)):b.sortsHeaders.appendArrowDown(a(this))})}}if(c.inputs.queries||c.features.search){var o=c.inputs.queries||a();c.features.search&&(o=o.add("#dynatable-query-search-"+b.element.id)),o.each(function(){var b=a(this),d=c.dataset.queries[b.data("dynatable-query")];b.val(d||"")})}b.$element.find(c.table.bodyRowSelector).remove(),b.$element.append(d),b.$element.trigger("dynatable:afterUpdate",d)}}function g(b,c){var d=this;this.initOnLoad=function(){return b.$element.is("table")},this.init=function(){c.table.columns=[],this.getFromTable()},this.getFromTable=function(){var e=b.$element.find(c.table.headRowSelector).children("th,td");return e.length?void e.each(function(b){d.add(a(this),b,!0)}):a.error("Couldn't find any columns headers in '"+c.table.headRowSelector+" th,td'. If your header row is different, specify the selector in the table: headRowSelector option.")},this.add=function(d,e,f,g){var h=c.table.columns,i=d.text(),j=d.data("dynatable-column")||w.normalizeText(i,c.table.defaultColumnIdStyle),k=d.data("dynatable-sorts"),l=k?a.map(k.split(","),function(b){return a.trim(b)}):[j];if(j||(this.generate(d),j=d.data("dynatable-column")),h.splice(e,0,{index:e,label:i,id:j,attributeWriter:c.writers[j]||c.writers._attributeWriter,attributeReader:c.readers[j]||c.readers._attributeReader,sorts:l,hidden:"none"===d.css("display"),textAlign:d.css("text-align")}),d.attr("data-dynatable-column",j).addClass("dynatable-head"),c.table.headRowClass&&d.addClass(c.table.headRowClass),!f){var m=e+1,n=b.$element.find(c.table.headRowSelector).children("th:nth-child("+m+"),td:nth-child("+m+")").first(),o=h.slice(e+1,h.length);if(n.length?n.before(d):b.$element.find(c.table.headRowSelector).append(d),b.sortsHeaders.attachOne(d.get()),o.length)for(var p=0,q=o.length;q>p;p++)o[p].index+=1;g||b.dom.update()}return u},this.remove=function(a){{var d=c.table.columns;d.length}if("number"==typeof a){var e=d[a];this.removeFromTable(e.id),this.removeFromArray(a)}else for(var f=d.length-1;f>=0;f--){var e=d[f];e.id===a&&(this.removeFromTable(a),this.removeFromArray(f))}b.dom.update()},this.removeFromTable=function(a){b.$element.find(c.table.headRowSelector).children('[data-dynatable-column="'+a+'"]').first().remove()},this.removeFromArray=function(a){var b,d=c.table.columns;d.splice(a,1),b=d.slice(a,d.length);for(var e=0,f=b.length;f>e;e++)b[e].index-=1},this.generate=function(b){var c=void 0===b?a("<th></th>"):b;return this.attachGeneratedAttributes(c)},this.attachGeneratedAttributes=function(a){var d=b.$element.find(c.table.headRowSelector).children("th[data-dynatable-generated]").length;return a.attr("data-dynatable-column","dynatable-generated-"+d).attr("data-dynatable-no-sort","true").attr("data-dynatable-generated",d)}}function h(b,c){this.initOnLoad=function(){return!c.dataset.ajax},this.init=function(){null===c.dataset.records&&(c.dataset.records=this.getFromTable(),c.dataset.queryRecordCount||(c.dataset.queryRecordCount=this.count()),c.dataset.totalRecordCount||(c.dataset.totalRecordCount=c.dataset.queryRecordCount)),c.dataset.originalRecords=a.extend(!0,[],c.dataset.records)},this.updateFromJson=function(a){var b;if("_root"===c.params.records?b=a:c.params.records in a&&(b=a[c.params.records]),c.params.record)for(var d=b.length-1,e=0;d>e;e++)b[e]=b[e][c.params.record];c.params.queryRecordCount in a&&(c.dataset.queryRecordCount=a[c.params.queryRecordCount]),c.params.totalRecordCount in a&&(c.dataset.totalRecordCount=a[c.params.totalRecordCount]),c.dataset.records=b},this.sort=function(){var d=[].sort,e=c.dataset.sorts,f=c.dataset.sortsKeys,g=c.dataset.sortTypes,h=function(c,d){var h;if(a.isEmptyObject(e))h=b.sorts.functions.originalPlacement(c,d);else for(var i=0,j=f.length;j>i;i++){var k=f[i],l=e[k],m=g[k]||b.sorts.guessType(c,d,k);if(h=b.sorts.functions[m](c,d,k,l),0!==h)break}return h};return d.call(c.dataset.records,h)},this.paginate=function(){var a=this.pageBounds(),b=a[0],d=a[1];c.dataset.records=c.dataset.records.slice(b,d)},this.resetOriginal=function(){c.dataset.records=c.dataset.originalRecords||[]},this.pageBounds=function(){var a=c.dataset.page||1,b=(a-1)*c.dataset.perPage,d=Math.min(b+c.dataset.perPage,c.dataset.queryRecordCount);return[b,d]},this.getFromTable=function(){var d=[],e=c.table.columns,f=b.$element.find(c.table.bodyRowSelector);return f.each(function(f){var g={};g["dynatable-original-index"]=f,a(this).find("th,td").each(function(c){void 0===e[c]&&b.domColumns.add(b.domColumns.generate(),e.length,!1,!0);var d=e[c].attributeReader(this,g),f=e[c].id;"string"==typeof d&&d.match(/\s*\<.+\>/)&&(g["dynatable-sortable-text"]||(g["dynatable-sortable-text"]={}),g["dynatable-sortable-text"][f]=a.trim(a("<div></div>").html(d).text())),g[f]=d}),"function"==typeof c.readers._rowReader&&c.readers._rowReader(f,this,g),d.push(g)}),d},this.count=function(){return c.dataset.records.length}}function i(b,c){this.initOnLoad=function(){return c.features.recordCount},this.init=function(){this.attach()},this.create=function(){var d=b.records.count(),e=c.dataset.queryRecordCount,f=c.dataset.totalRecordCount,g=c.inputs.recordCountText,h=c.params.records;if(e>d&&c.features.paginate){var i=b.records.pageBounds();g+="<span class='dynatable-record-bounds'>"+(i[0]+1)+" to "+i[1]+"</span> of "}else d===e&&c.features.paginate&&(g+=d+" of ");return g+=e+" "+h,f>e&&(g+=" (filtered from "+f+" total records)"),a("<span></span>",{id:"dynatable-record-count-"+b.element.id,"class":"dynatable-record-count",html:g})},this.attach=function(){var d=c.inputs.recordCountTarget?a(c.inputs.recordCountTarget):b.$element;d[c.inputs.recordCountPlacement](this.create())}}function j(b,c){this.init=function(){this.attach()},this.create=function(){var d=a("<div></div>",{html:"<span>"+c.inputs.processingText+"</span>",id:"dynatable-processing-"+b.element.id,"class":"dynatable-processing",style:"position: absolute; display: none;"});return d},this.position=function(){var c=a("#dynatable-processing-"+b.element.id),d=c.children("span"),e=d.outerHeight(),f=d.outerWidth(),g=b.$element,h=g.offset(),i=g.outerHeight(),j=g.outerWidth();return c.offset({left:h.left,top:h.top}).width(j).height(i),d.offset({left:h.left+(j-f)/2,top:h.top+(i-e)/2}),c},this.attach=function(){b.$element.before(this.create())},this.show=function(){a("#dynatable-processing-"+b.element.id).show(),this.position()},this.hide=function(){a("#dynatable-processing-"+b.element.id).hide()}}function k(b,c){this.initOnLoad=function(){return c.features.pushState&&history.pushState},this.init=function(){window.onpopstate=function(a){a.state&&a.state.dynatable&&b.state.pop(a)}},this.push=function(d){var e,f,g,h,i,j,k=window.location.search,l=!(window.history.state&&window.history.state.dynatable),m=l?"replaceState":"pushState";k&&/^\?/.test(k)&&(k=k.substring(1)),a.extend(e,d),g=w.refreshQueryString(k,d,c),g&&(g="?"+g),h=window.location.hash,f=window.location.pathname,b.$element.trigger("dynatable:push",d),j={dynatable:{dataset:c.dataset}},l||(j.dynatable.scrollTop=a(window).scrollTop()),i=JSON.stringify(j),j.dynatable.dataset.perPageOptions=a.makeArray(j.dynatable.dataset.perPageOptions);try{window.history[m](j,"Dynatable state",f+g+h)}catch(n){j.dynatable.dataset.records=null,window.history[m](j,"Dynatable state",f+g+h)}},this.pop=function(d){var e=d.state.dynatable;c.dataset=e.dataset,e.scrollTop&&a(window).scrollTop(e.scrollTop),e.dataset.records?b.dom.update():b.process(!0)}}function l(b,c){this.initOnLoad=function(){return c.features.sort},this.init=function(){var a=window.location.search.match(new RegExp(c.params.sorts+"[^&=]*=[^&]*","g"));c.dataset.sorts=a?w.deserialize(a)[c.params.sorts]:{},c.dataset.sortsKeys=a?w.keysFromObject(c.dataset.sorts):[]},this.add=function(b,d){var e=c.dataset.sortsKeys,f=a.inArray(b,e);return c.dataset.sorts[b]=d,-1===f&&e.push(b),u},this.remove=function(b){var d=c.dataset.sortsKeys,e=a.inArray(b,d);return delete c.dataset.sorts[b],-1!==e&&d.splice(e,1),u},this.clear=function(){c.dataset.sorts={},c.dataset.sortsKeys.length=0},this.guessType=function(a,b,c){var d={string:"string",number:"number","boolean":"number",object:"number"},e=a[c]?typeof a[c]:typeof b[c],f=d[e]||"number";return f},this.functions={number:function(a,b,c,d){return a[c]===b[c]?0:d>0?a[c]-b[c]:b[c]-a[c]},string:function(a,b,c,d){var e,f=a["dynatable-sortable-text"]&&a["dynatable-sortable-text"][c]?a["dynatable-sortable-text"][c]:a[c],g=b["dynatable-sortable-text"]&&b["dynatable-sortable-text"][c]?b["dynatable-sortable-text"][c]:b[c];return f=f.toLowerCase(),g=g.toLowerCase(),e=f===g?0:d>0?f>g:g>f,e===!1?-1:e-0},originalPlacement:function(a,b){return a["dynatable-original-index"]-b["dynatable-original-index"]}}}function m(b,c){var d=this;this.initOnLoad=function(){return c.features.sort},this.init=function(){this.attach()},this.create=function(e){var f=a(e),g=a("<a></a>",{"class":"dynatable-sort-header",href:"#",html:f.html()}),h=f.data("dynatable-column"),i=w.findObjectInArray(c.table.columns,{id:h});return g.bind("click",function(a){d.toggleSort(a,g,i),b.process(),a.preventDefault()}),this.sortedByColumn(g,i)&&(1==this.sortedByColumnValue(i)?this.appendArrowUp(g):this.appendArrowDown(g)),g},this.removeAll=function(){b.$element.find(c.table.headRowSelector).children("th,td").each(function(){d.removeAllArrows(),d.removeOne(this)})},this.removeOne=function(b){var c=a(b),d=c.find(".dynatable-sort-header");if(d.length){var e=d.html();d.remove(),c.html(c.html()+e)}},this.attach=function(){b.$element.find(c.table.headRowSelector).children("th,td").each(function(){d.attachOne(this)})},this.attachOne=function(b){var c=a(b);c.data("dynatable-no-sort")||c.html(this.create(b))},this.appendArrowUp=function(a){this.removeArrow(a),a.append("<span class='dynatable-arrow'> &#9650;</span>")},this.appendArrowDown=function(a){this.removeArrow(a),a.append("<span class='dynatable-arrow'> &#9660;</span>")},this.removeArrow=function(a){a.find(".dynatable-arrow").remove()},this.removeAllArrows=function(){b.$element.find(".dynatable-arrow").remove()},this.toggleSort=function(a,d,e){var f=this.sortedByColumn(d,e),g=this.sortedByColumnValue(e);if(c.inputs.multisort&&w.anyMatch(a,c.inputs.multisort,function(b,c){return a[c]})||(this.removeAllArrows(),b.sorts.clear()),f)if(1==g){for(var h=0,i=e.sorts.length;i>h;h++)b.sorts.add(e.sorts[h],-1);this.appendArrowDown(d)}else{for(var h=0,i=e.sorts.length;i>h;h++)b.sorts.remove(e.sorts[h]);this.removeArrow(d)}else{for(var h=0,i=e.sorts.length;i>h;h++)b.sorts.add(e.sorts[h],1);this.appendArrowUp(d)}},this.sortedByColumn=function(a,b){return w.allMatch(c.dataset.sorts,b.sorts,function(a,b){return b in a})},this.sortedByColumnValue=function(a){return c.dataset.sorts[a.sorts[0]]}}function n(b,c){var d=this;this.initOnLoad=function(){return c.inputs.queries||c.features.search},this.init=function(){var a=window.location.search.match(new RegExp(c.params.queries+"[^&=]*=[^&]*","g"));c.dataset.queries=a?w.deserialize(a)[c.params.queries]:{},""===c.dataset.queries&&(c.dataset.queries={}),c.inputs.queries&&this.setupInputs()},this.add=function(a,b){return c.features.paginate&&(c.dataset.page=1),c.dataset.queries[a]=b,u},this.remove=function(a){return delete c.dataset.queries[a],u},this.run=function(){for(query in c.dataset.queries)if(c.dataset.queries.hasOwnProperty(query)){var e=c.dataset.queries[query];if(void 0===d.functions[query]){var f=w.findObjectInArray(c.table.columns,{id:query});if(!f){a.error("Query named '"+query+"' called, but not defined in queries.functions");continue}d.functions[query]=function(a,b){return a[query]==b}}c.dataset.records=a.map(c.dataset.records,function(a){return d.functions[query](a,e)?a:null})}c.dataset.queryRecordCount=b.records.count()},this.runSearch=function(d){var e=a.extend({},c.dataset.queries);d?this.add("search",d):this.remove("search"),w.objectsEqual(c.dataset.queries,e)||b.process()},this.setupInputs=function(){c.inputs.queries.each(function(){var e=a(this),f=e.data("dynatable-query-event")||c.inputs.queryEvent,g=e.data("dynatable-query")||e.attr("name")||this.id,h=function(e){var f=a(this).val();return""===f&&(f=void 0),f===c.dataset.queries[g]?!1:(f?d.add(g,f):d.remove(g),b.process(),void e.preventDefault())};e.attr("data-dynatable-query",g).bind(f,h).bind("keypress",function(a){13==a.which&&h.call(this,a)}),c.dataset.queries[g]&&e.val(decodeURIComponent(c.dataset.queries[g]))})},this.functions={search:function(a,b){var c=!1;for(attr in a)if(a.hasOwnProperty(attr)){var d=a[attr];if("string"==typeof d&&-1!==d.toLowerCase().indexOf(b.toLowerCase())){c=!0;break}}else;return c}}}function o(b,c){this.initOnLoad=function(){return c.features.search},this.init=function(){this.attach()},this.create=function(){var d=a("<input />",{type:"search",id:"dynatable-query-search-"+b.element.id,"data-dynatable-query":"search",value:c.dataset.queries.search}),e=a("<span></span>",{id:"dynatable-search-"+b.element.id,"class":"dynatable-search",text:"Search: "}).append(d);return d.bind(c.inputs.queryEvent,function(){b.queries.runSearch(a(this).val())}).bind("keypress",function(c){13==c.which&&(b.queries.runSearch(a(this).val()),c.preventDefault())}),e},this.attach=function(){var d=c.inputs.searchTarget?a(c.inputs.searchTarget):b.$element;d[c.inputs.searchPlacement](this.create())}}function p(a,b){this.initOnLoad=function(){return b.features.paginate},this.init=function(){var a=window.location.search.match(new RegExp(b.params.page+"=([^&]*)"));this.set(a&&b.features.pushState?a[1]:1)},this.set=function(a){b.dataset.page=parseInt(a,10)}}function q(b,c){var d=this;this.initOnLoad=function(){return c.features.paginate},this.init=function(){var a=window.location.search.match(new RegExp(c.params.perPage+"=([^&]*)"));a&&c.features.pushState?this.set(a[1],!0):this.set(c.dataset.perPageDefault,!0),c.features.perPageSelect&&this.attach()},this.create=function(){for(var e=a("<select>",{id:"dynatable-per-page-"+b.element.id,"class":"dynatable-per-page-select"}),f=0,g=c.dataset.perPageOptions.length;g>f;f++){var h=c.dataset.perPageOptions[f],i=c.dataset.perPage==h?'selected="selected"':"";e.append('<option value="'+h+'" '+i+">"+h+"</option>")}return e.bind("change",function(){d.set(a(this).val()),b.process()}),a("<span />",{"class":"dynatable-per-page"}).append("<span class='dynatable-per-page-label'>"+c.inputs.perPageText+"</span>").append(e)},this.attach=function(){var d=c.inputs.perPageTarget?a(c.inputs.perPageTarget):b.$element;d[c.inputs.perPagePlacement](this.create())},this.set=function(a,d){d||b.paginationPage.set(1),c.dataset.perPage=parseInt(a)}}function r(b,c){this.initOnLoad=function(){return c.features.paginate},this.init=function(){this.attach()},this.create=function(){var d='<ul id="dynatable-pagination-links-'+b.element.id+'" class="'+c.inputs.paginationClass+'">',e=c.inputs.paginationLinkClass,f=c.inputs.paginationActiveClass,g=c.inputs.paginationDisabledClass,h=Math.ceil(c.dataset.queryRecordCount/c.dataset.perPage),i=c.dataset.page,j=[c.inputs.paginationGap[0],c.dataset.page-c.inputs.paginationGap[1],c.dataset.page+c.inputs.paginationGap[2],h+1-c.inputs.paginationGap[3]];d+="<li><span>Pages: </span></li>";for(var k=1;h>=k;k++)if(!(k>j[0]&&k<j[1]||k>j[2]&&k<j[3])){var l,m,n=b.paginationLinks.buildLink(k,k,e,i==k,f);if(l=a.inArray(k,j),m=j[l+1],l>0&&1!==k&&m&&m>k+1){var o='<li><span class="dynatable-page-break">&hellip;</span></li>';n=2>l?o+n:n+o}if(c.inputs.paginationPrev&&1===k){var p=b.paginationLinks.buildLink(i-1,c.inputs.paginationPrev,e+" "+c.inputs.paginationPrevClass,1===i,g);n=p+n}if(c.inputs.paginationNext&&k===h){var q=b.paginationLinks.buildLink(i+1,c.inputs.paginationNext,e+" "+c.inputs.paginationNextClass,i===h,g);n+=q}d+=n}d+="</ul>";var r="#dynatable-pagination-links-"+b.element.id+" a."+e+":not(."+f+",."+g+")";return a(document).undelegate(r,"click.dynatable"),a(document).delegate(r,"click.dynatable",function(d){$this=a(this),$this.closest(c.inputs.paginationClass).find("."+f).removeClass(f),$this.addClass(f),b.paginationPage.set($this.data("dynatable-page")),b.process(),d.preventDefault()}),d},this.buildLink=function(a,b,c,d,e){var f="<a data-dynatable-page="+a+' class="'+c,g="<li";return d&&(f+=" "+e,g+=' class="'+e+'"'),f+='">'+b+"</a>",g+=">"+f+"</li>"},this.attach=function(){var d=c.inputs.paginationLinkTarget?a(c.inputs.paginationLinkTarget):b.$element;d[c.inputs.paginationLinkPlacement](b.paginationLinks.create())}}var s,t,u,v,w,x,y,b,c,d,e,z={dom:f,domColumns:g,records:h,recordsCount:i,processingIndicator:j,state:k,sorts:l,sortsHeaders:m,queries:n,inputsSearch:o,paginationPage:p,paginationPerPage:q,paginationLinks:r};s={features:{paginate:!0,sort:!0,pushState:!0,search:!0,recordCount:!0,perPageSelect:!0},table:{defaultColumnIdStyle:"camelCase",columns:null,headRowSelector:"thead tr",bodyRowSelector:"tbody tr",headRowClass:null},inputs:{queries:null,sorts:null,multisort:["ctrlKey","shiftKey","metaKey"],page:null,queryEvent:"blur change",recordCountTarget:null,recordCountPlacement:"after",paginationLinkTarget:null,paginationLinkPlacement:"after",paginationClass:"dynatable-pagination-links",paginationLinkClass:"dynatable-page-link",paginationPrevClass:"dynatable-page-prev",paginationNextClass:"dynatable-page-next",paginationActiveClass:"dynatable-active-page",paginationDisabledClass:"dynatable-disabled-page",paginationPrev:"Previous",paginationNext:"Next",paginationGap:[1,2,2,1],searchTarget:null,searchPlacement:"before",perPageTarget:null,perPagePlacement:"before",perPageText:"Show: ",recordCountText:"Showing ",processingText:"Processing..."},dataset:{ajax:!1,ajaxUrl:null,ajaxCache:null,ajaxOnLoad:!1,ajaxMethod:"GET",ajaxDataType:"json",totalRecordCount:null,queries:{},queryRecordCount:null,page:null,perPageDefault:10,perPageOptions:[10,20,50,100],sorts:{},sortsKeys:null,sortTypes:{},records:null},writers:{_rowWriter:b,_cellWriter:c,_attributeWriter:d},readers:{_rowReader:null,_attributeReader:e},params:{dynatable:"dynatable",queries:"queries",sorts:"sorts",page:"page",perPage:"perPage",offset:"offset",records:"records",record:null,queryRecordCount:"queryRecordCount",totalRecordCount:"totalRecordCount"}},u={init:function(b,c){return this.settings=t(c),this.element=b,this.$element=a(b),x.call(this),this},process:function(a){y.call(this,a)}},t=function(b){var c=a.extend(!0,{},s,b);return b&&(b.inputs&&(b.inputs.multisort&&(c.inputs.multisort=b.inputs.multisort),b.inputs.paginationGap&&(c.inputs.paginationGap=b.inputs.paginationGap)),b.dataset&&b.dataset.perPageOptions&&(c.dataset.perPageOptions=b.dataset.perPageOptions)),c},x=function(){this.$element.trigger("dynatable:preinit",this);for(model in z)if(z.hasOwnProperty(model)){var a=this[model]=new z[model](this,this.settings);a.initOnLoad()&&a.init()}this.$element.trigger("dynatable:init",this),(!this.settings.dataset.ajax||this.settings.dataset.ajax&&this.settings.dataset.ajaxOnLoad||this.settings.features.paginate)&&this.process()},y=function(b){var c={};if(this.$element.trigger("dynatable:beforeProcess",c),a.isEmptyObject(this.settings.dataset.queries)||(c[this.settings.params.queries]=this.settings.dataset.queries),this.processingIndicator.show(),this.settings.features.sort&&!a.isEmptyObject(this.settings.dataset.sorts)&&(c[this.settings.params.sorts]=this.settings.dataset.sorts),this.settings.features.paginate&&this.settings.dataset.page){var d=this.settings.dataset.page,e=this.settings.dataset.perPage;c[this.settings.params.page]=d,c[this.settings.params.perPage]=e,c[this.settings.params.offset]=(d-1)*e}if(this.settings.dataset.ajaxData&&a.extend(c,this.settings.dataset.ajaxData),this.settings.dataset.ajax){var f=this,g={type:f.settings.dataset.ajaxMethod,dataType:f.settings.dataset.ajaxDataType,data:c,error:function(){},success:function(a){f.$element.trigger("dynatable:ajax:success",a),f.records.updateFromJson(a),f.dom.update(),!b&&f.state.initOnLoad()&&f.state.push(c)},complete:function(){f.processingIndicator.hide()}};g.url=this.settings.dataset.ajaxUrl?this.settings.dataset.ajaxUrl:w.refreshQueryString(window.location.href,{},this.settings),null!==this.settings.dataset.ajaxCache&&(g.cache=this.settings.dataset.ajaxCache),a.ajax(g)}else this.records.resetOriginal(),this.queries.run(),this.settings.features.sort&&this.records.sort(),this.settings.features.paginate&&this.records.paginate(),this.dom.update(),this.processingIndicator.hide(),!b&&this.state.initOnLoad()&&this.state.push(c);this.$element.trigger("dynatable:afterProcess",c)},v={initOnLoad:function(){return!0},init:function(){}};for(model in z)if(z.hasOwnProperty(model)){var A=z[model];A.prototype=v}w=u.utility={normalizeText:function(a,b){return a=this.textTransform[b](a)},textTransform:{trimDash:function(a){return a.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"-")},camelCase:function(a){return a=this.trimDash(a),a.replace(/(\-[a-zA-Z])/g,function(a){return a.toUpperCase().replace("-","")}).replace(/([A-Z])([A-Z]+)/g,function(a,b,c){return b+c.toLowerCase()}).replace(/^[A-Z]/,function(a){return a.toLowerCase()})},dashed:function(a){return a=this.trimDash(a),this.lowercase(a)},underscore:function(a){return a=this.trimDash(a),this.lowercase(a.replace(/(-)/g,"_"))},lowercase:function(a){return a.replace(/([A-Z])/g,function(a){return a.toLowerCase()})}},deserialize:function(b){if(!b)return{};"object"==typeof b&&(b=b.join("&"));for(var c={},d=b.split("&"),e=0;e<d.length;e++){var f,g,h=d[e].split("="),i=decodeURIComponent(h[0]);if(h[1]){for(f=decodeURIComponent(h[1].replace(/\+/g," "));g=i.match(/([^&=]+)\[([^&=]+)\]$/);){var j=f;i=g[1],f={},"]["==g[2].substr(g[2].length-2)?f[g[2].substr(0,g[2].length-2)]=[j]:f[g[2]]=j}"undefined"==typeof c[i]?c[i]="[]"!=i.substr(i.length-2)?f:[f]:"string"==typeof c[i]?c[i]=f:"object"==typeof c[i]?c[i]=a.extend({},c[i],f):c[i].push(f)}}return c},refreshQueryString:function(b,c,d){{var e,f=this,g=b.split("?");g.shift()}e=this.deserialize(b);for(m in d.params)if(d.params.hasOwnProperty(m)){var h=d.params[m];if(!d.features.sort&&"sorts"==m||!d.features.paginate&&f.anyMatch(m,["page","perPage","offset"],function(a,b){return a==b}))continue;if(("page"===m||"offset"===m)&&1===c.page){e[h]&&delete e[h];continue}if("perPage"===m&&c[h]==d.dataset.perPageDefault){e[h]&&delete e[h];continue}if("queries"==m&&c[h]){var i=d.inputs.queries||[],j=a.makeArray(i.map(function(){return a(this).attr("name")}));d.features.search&&j.push("search");for(var k=0,l=j.length;l>k;k++){var m=j[k];c[h][m]?("undefined"==typeof e[h]&&(e[h]={}),e[h][m]=c[h][m]):delete e[h][m]}continue}c[h]?e[h]=c[h]:delete e[h]}return decodeURI(a.param(e))},keysFromObject:function(a){var b=[];for(var c in a)b.push(c);return b},findObjectInArray:function(a,b){for(var c,d=this,e=0,f=a.length;f>e;e++){var g=a[e];if(d.allMatch(g,b,function(a,b,c){return a[b]==c})){c=g;break}}return c},allMatch:function(b,c,d){var e=!0,f=a.isArray(c);return a.each(c,function(a,c){var g=f?d(b,c):d(b,a,c);return g?void 0:e=!1}),e},anyMatch:function(b,c,d){var e=!1,f=a.isArray(c);return a.each(c,function(a,c){var g=f?d(b,c):d(b,a,c);return g?(e=!0,!1):void 0}),e},objectsEqual:function(a,b){for(attr in a)if(a.hasOwnProperty(attr)&&(!b.hasOwnProperty(attr)||a[attr]!==b[attr]))return!1;for(attr in b)if(b.hasOwnProperty(attr)&&!a.hasOwnProperty(attr))return!1;return!0},randomHash:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)}},"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b}),a.dynatableSetup=function(a){s=t(a)},a.dynatable=function(b){a.fn.dynatable=function(c){return this.each(function(){a.data(this,"dynatable")||a.data(this,"dynatable",Object.create(b).init(this,c))})}},a.dynatable(u)}(jQuery),FrontendCore.define("table",[],function(){return{sPathCss:oGlobalSettings.sPathCssUI+"?v="+oGlobalSettings.sHash,oTable:[],oDefault:{features:{paginate:!0,sort:!0,pushState:!0,search:!0,recordCount:!0,perPageSelect:!0},inputs:{queries:null,sorts:null,multisort:["ctrlKey","shiftKey","metaKey"],page:null,queryEvent:"blur change",recordCountTarget:null,recordCountPlacement:"after",paginationLinkTarget:null,paginationLinkPlacement:"after",paginationClass:"pagination dynatable-pagination",paginationLinkClass:"dynatable-page-link",paginationPrevClass:"dynatable-page-prev",paginationNextClass:"dynatable-page-next",paginationActiveClass:"dynatable-active-page",paginationDisabledClass:"dynatable-disabled-page",paginationPrev:'<i class="icon-step-backward"></i>',paginationNext:'<i class="icon-step-forward"></i>',paginationGap:[1,2,2,1],searchTarget:null,searchPlacement:"before",perPageTarget:null,perPagePlacement:"before",perPageText:'<i class="icon-table"></i> ',recordCountText:"",processingText:"Processing..."},params:{dynatable:"table",queries:"queries",sorts:"sorts",page:'<i class="icon-page"></i>',perPage:"perPage",offset:"offset",records:"",record:null,queryRecordCount:"queryRecordCount",totalRecordCount:"totalRecordCount"}},onStart:function(){var a=FrontendTools.getDataModules("table"),b=this;FrontendTools.loadCSS(this.sPathCss),FrontendTools.trackModule("JS_Libraries","call","table"),$(a).each(function(a){b.autobind(this,a)})},autobind:function(a,b){var c=this,d=$(a),e="";"false"===a.getAttribute("data-fc-pagination")&&(c.oDefault.features.paginate=!1,c.oDefault.features.perPageSelect=!1,c.oDefault.features.recordCount=!1),"false"===a.getAttribute("data-fc-sort")&&(c.oDefault.features.sort=!1),"false"===a.getAttribute("data-fc-search")&&(c.oDefault.features.search=!1),(c.oDefault.features.search||c.oDefault.features.paginate)&&(e="table-dynamic"),d.addClass(e),c.oTable[b]=d.dynatable(c.oDefault),$("input",".dynatable-search").keyup(function(){$(this).blur().focus()})},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}});