function UncamelCase(name){return name.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z0-9])/,"$1 $2$3").replace(/ /g,"-").toLowerCase()}function functionName(func){return"function"===typeof func?func.toString().replace(/^[\S\s]*?function\s*/,"").replace(/[\s\(\/][\S\s]+$/,""):void 0}function getDefine(id){return customElements.get(id)}function getId(proto){let name=proto.hasOwnProperty("name")?proto.name:functionName(proto);if("Define"===name||"class"===name){name=""}return name?UncamelCase(name):proto.is}function defineDefineProperty(_plugins=[],_Define=getDefine,_getId=getId){let descriptor;if(!window.Define){Object.defineProperty(window,"Define",descriptor={configurable:!1,enumerable:!1,get:function(){return _Define},set:function(proto){let id=_getId(proto);if(!id){throw new Error("Custom element name is not defined")}_plugins.forEach(plugin=>plugin(proto,id));if(customElements.get(id)){console.warn("Discarding duplicate definition of custom element "+id)}else{customElements.define(id,proto);_Define[id]=customElements.get(id)}return customElements.get(id)}})}return descriptor}var defineElementBase={UncamelCase:UncamelCase,functionName:functionName,getDefine:getDefine,getId:getId,defineDefineProperty:defineDefineProperty};window.JSCompiler_renameProperty=function(prop,obj){return prop};let CSS_URL_RX=/(url\()([^)]*)(\))/g,ABS_URL=/(^\/)|(^#)|(^[\w-\d]*:)/,workingURL,resolveDoc;function resolveUrl(url,baseURI){if(url&&ABS_URL.test(url)){return url}if(workingURL===void 0){workingURL=!1;try{const u=new URL("b","http://a");u.pathname="c%20d";workingURL="http://a/c%20d"===u.href}catch(e){}}if(!baseURI){baseURI=document.baseURI||window.location.href}if(workingURL){return new URL(url,baseURI).href}if(!resolveDoc){resolveDoc=document.implementation.createHTMLDocument("temp");resolveDoc.base=resolveDoc.createElement("base");resolveDoc.head.appendChild(resolveDoc.base);resolveDoc.anchor=resolveDoc.createElement("a");resolveDoc.body.appendChild(resolveDoc.anchor)}resolveDoc.base.href=baseURI;resolveDoc.anchor.href=url;return resolveDoc.anchor.href||url}function resolveCss(cssText,baseURI){return cssText.replace(CSS_URL_RX,function(m,pre,url,post){return pre+"'"+resolveUrl(url.replace(/["']/g,""),baseURI)+"'"+post})}function pathFromUrl(url){return url.substring(0,url.lastIndexOf("/")+1)}var resolveUrl$1={resolveUrl:resolveUrl,resolveCss:resolveCss,pathFromUrl:pathFromUrl};const useShadow=!window.ShadyDOM,useNativeCSSProperties=!!(!window.ShadyCSS||window.ShadyCSS.nativeCss),useNativeCustomElements=!window.customElements.polyfillWrapFlushCallback;let rootPath=void 0||pathFromUrl(document.baseURI||window.location.href);const setRootPath=function(path){rootPath=path};let sanitizeDOMValue=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;const setSanitizeDOMValue=function(newSanitizeDOMValue){sanitizeDOMValue=newSanitizeDOMValue};let passiveTouchGestures=!1;const setPassiveTouchGestures=function(usePassive){passiveTouchGestures=usePassive};let strictTemplatePolicy=!1;const setStrictTemplatePolicy=function(useStrictPolicy){strictTemplatePolicy=useStrictPolicy};let allowTemplateFromDomModule=!1;const setAllowTemplateFromDomModule=function(allowDomModule){allowTemplateFromDomModule=allowDomModule};var settings={useShadow:useShadow,useNativeCSSProperties:useNativeCSSProperties,useNativeCustomElements:useNativeCustomElements,get rootPath(){return rootPath},setRootPath:setRootPath,get sanitizeDOMValue(){return sanitizeDOMValue},setSanitizeDOMValue:setSanitizeDOMValue,get passiveTouchGestures(){return passiveTouchGestures},setPassiveTouchGestures:setPassiveTouchGestures,get strictTemplatePolicy(){return strictTemplatePolicy},setStrictTemplatePolicy:setStrictTemplatePolicy,get allowTemplateFromDomModule(){return allowTemplateFromDomModule},setAllowTemplateFromDomModule:setAllowTemplateFromDomModule};let dedupeId=0;function MixinFunction(){}MixinFunction.prototype.__mixinApplications;MixinFunction.prototype.__mixinSet;const dedupingMixin=function(mixin){let mixinApplications=mixin.__mixinApplications;if(!mixinApplications){mixinApplications=new WeakMap;mixin.__mixinApplications=mixinApplications}let mixinDedupeId=dedupeId++;function dedupingMixin(base){let baseSet=base.__mixinSet;if(baseSet&&baseSet[mixinDedupeId]){return base}let map=mixinApplications,extended=map.get(base);if(!extended){extended=mixin(base);map.set(base,extended)}let mixinSet=Object.create(extended.__mixinSet||baseSet||null);mixinSet[mixinDedupeId]=!0;extended.__mixinSet=mixinSet;return extended}return dedupingMixin};var mixin={dedupingMixin:dedupingMixin};let modules={},lcModules={};function setModule(id,module){modules[id]=lcModules[id.toLowerCase()]=module}function findModule(id){return modules[id]||lcModules[id.toLowerCase()]}function styleOutsideTemplateCheck(inst){if(inst.querySelector("style")){console.warn("dom-module %s has style outside template",inst.id)}}class DomModule extends HTMLElement{static get observedAttributes(){return["id"]}static import(id,selector){if(id){let m=findModule(id);if(m&&selector){return m.querySelector(selector)}return m}return null}attributeChangedCallback(name,old,value,namespace){if(old!==value){this.register()}}get assetpath(){if(!this.__assetpath){const owner=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,url=resolveUrl(this.getAttribute("assetpath")||"",owner.baseURI);this.__assetpath=pathFromUrl(url)}return this.__assetpath}register(id){id=id||this.id;if(id){if(strictTemplatePolicy&&findModule(id)!==void 0){setModule(id,null);throw new Error(`strictTemplatePolicy: dom-module ${id} re-registered`)}this.id=id;setModule(id,this);styleOutsideTemplateCheck(this)}}}DomModule.prototype.modules=modules;customElements.define("dom-module",DomModule);var domModule={DomModule:DomModule};const MODULE_STYLE_LINK_SELECTOR="link[rel=import][type~=css]",INCLUDE_ATTR="include",SHADY_UNSCOPED_ATTR="shady-unscoped";function importModule(moduleId){return DomModule.import(moduleId)}function styleForImport(importDoc){let container=importDoc.body?importDoc.body:importDoc;const importCss=resolveCss(container.textContent,importDoc.baseURI),style=document.createElement("style");style.textContent=importCss;return style}let templateWithAssetPath;function stylesFromModules(moduleIds){const modules=moduleIds.trim().split(/\s+/),styles=[];for(let i=0;i<modules.length;i++){styles.push(...stylesFromModule(modules[i]))}return styles}function stylesFromModule(moduleId){const m=importModule(moduleId);if(!m){console.warn("Could not find style data in module named",moduleId);return[]}if(m._styles===void 0){const styles=[..._stylesFromModuleImports(m)],template=m.querySelector("template");if(template){styles.push(...stylesFromTemplate(template,m.assetpath))}m._styles=styles}return m._styles}function stylesFromTemplate(template,baseURI){if(!template._styles){const styles=[],e$=template.content.querySelectorAll("style");for(let i=0;i<e$.length;i++){let e=e$[i],include=e.getAttribute(INCLUDE_ATTR);if(include){styles.push(...stylesFromModules(include).filter(function(item,index,self){return self.indexOf(item)===index}))}if(baseURI){e.textContent=resolveCss(e.textContent,baseURI)}styles.push(e)}template._styles=styles}return template._styles}function stylesFromModuleImports(moduleId){let m=importModule(moduleId);return m?_stylesFromModuleImports(m):[]}function _stylesFromModuleImports(module){const styles=[],p$=module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);for(let i=0,p;i<p$.length;i++){p=p$[i];if(p.import){const importDoc=p.import,unscoped=p.hasAttribute(SHADY_UNSCOPED_ATTR);if(unscoped&&!importDoc._unscopedStyle){const style=styleForImport(importDoc);style.setAttribute(SHADY_UNSCOPED_ATTR,"");importDoc._unscopedStyle=style}else if(!importDoc._style){importDoc._style=styleForImport(importDoc)}styles.push(unscoped?importDoc._unscopedStyle:importDoc._style)}}return styles}function cssFromModules(moduleIds){let modules=moduleIds.trim().split(/\s+/),cssText="";for(let i=0;i<modules.length;i++){cssText+=cssFromModule(modules[i])}return cssText}function cssFromModule(moduleId){let m=importModule(moduleId);if(m&&m._cssText===void 0){let cssText=_cssFromModuleImports(m),t=m.querySelector("template");if(t){cssText+=cssFromTemplate(t,m.assetpath)}m._cssText=cssText||null}if(!m){console.warn("Could not find style data in module named",moduleId)}return m&&m._cssText||""}function cssFromTemplate(template,baseURI){let cssText="";const e$=stylesFromTemplate(template,baseURI);for(let i=0,e;i<e$.length;i++){e=e$[i];if(e.parentNode){e.parentNode.removeChild(e)}cssText+=e.textContent}return cssText}function cssFromModuleImports(moduleId){let m=importModule(moduleId);return m?_cssFromModuleImports(m):""}function _cssFromModuleImports(module){let cssText="",styles=_stylesFromModuleImports(module);for(let i=0;i<styles.length;i++){cssText+=styles[i].textContent}return cssText}var styleGather={stylesFromModules:stylesFromModules,stylesFromModule:stylesFromModule,stylesFromTemplate:stylesFromTemplate,stylesFromModuleImports:stylesFromModuleImports,cssFromModules:cssFromModules,cssFromModule:cssFromModule,cssFromTemplate:cssFromTemplate,cssFromModuleImports:cssFromModuleImports};function isPath(path){return 0<=path.indexOf(".")}function root(path){let dotIndex=path.indexOf(".");if(-1===dotIndex){return path}return path.slice(0,dotIndex)}function isAncestor(base,path){return 0===base.indexOf(path+".")}function isDescendant(base,path){return 0===path.indexOf(base+".")}function translate$1(base,newBase,path){return newBase+path.slice(base.length)}function matches(base,path){return base===path||isAncestor(base,path)||isDescendant(base,path)}function normalize(path){if(Array.isArray(path)){let parts=[];for(let i=0,args;i<path.length;i++){args=path[i].toString().split(".");for(let j=0;j<args.length;j++){parts.push(args[j])}}return parts.join(".")}else{return path}}function split(path){if(Array.isArray(path)){return normalize(path).split(".")}return path.toString().split(".")}function get(root,path,info){let prop=root,parts=split(path);for(let i=0;i<parts.length;i++){if(!prop){return}let part=parts[i];prop=prop[part]}if(info){info.path=parts.join(".")}return prop}function set(root,path,value){let prop=root,parts=split(path),last=parts[parts.length-1];if(1<parts.length){for(let i=0,part;i<parts.length-1;i++){part=parts[i];prop=prop[part];if(!prop){return}}prop[last]=value}else{prop[path]=value}return parts.join(".")}const isDeep=isPath;var path={isPath:isPath,root:root,isAncestor:isAncestor,isDescendant:isDescendant,translate:translate$1,matches:matches,normalize:normalize,split:split,get:get,set:set,isDeep:isDeep};const caseMap={},DASH_TO_CAMEL=/-[a-z]/g,CAMEL_TO_DASH=/([A-Z])/g;function dashToCamelCase(dash){return caseMap[dash]||(caseMap[dash]=0>dash.indexOf("-")?dash:dash.replace(DASH_TO_CAMEL,m=>m[1].toUpperCase()))}function camelToDashCase(camel){return caseMap[camel]||(caseMap[camel]=camel.replace(CAMEL_TO_DASH,"-$1").toLowerCase())}var caseMap$1={dashToCamelCase:dashToCamelCase,camelToDashCase:camelToDashCase};let microtaskCurrHandle=0,microtaskLastHandle=0,microtaskCallbacks=[],microtaskNodeContent=0,microtaskNode=document.createTextNode("");new window.MutationObserver(microtaskFlush).observe(microtaskNode,{characterData:!0});function microtaskFlush(){const len=microtaskCallbacks.length;for(let i=0,cb;i<len;i++){cb=microtaskCallbacks[i];if(cb){try{cb()}catch(e){setTimeout(()=>{throw e})}}}microtaskCallbacks.splice(0,len);microtaskLastHandle+=len}const timeOut={after(delay){return{run(fn){return window.setTimeout(fn,delay)},cancel(handle){window.clearTimeout(handle)}}},run(fn,delay){return window.setTimeout(fn,delay)},cancel(handle){window.clearTimeout(handle)}},animationFrame={run(fn){return window.requestAnimationFrame(fn)},cancel(handle){window.cancelAnimationFrame(handle)}},idlePeriod={run(fn){return window.requestIdleCallback?window.requestIdleCallback(fn):window.setTimeout(fn,16)},cancel(handle){window.cancelIdleCallback?window.cancelIdleCallback(handle):window.clearTimeout(handle)}},microTask={run(callback){microtaskNode.textContent=microtaskNodeContent++;microtaskCallbacks.push(callback);return microtaskCurrHandle++},cancel(handle){const idx=handle-microtaskLastHandle;if(0<=idx){if(!microtaskCallbacks[idx]){throw new Error("invalid async handle: "+handle)}microtaskCallbacks[idx]=null}}};var async={timeOut:timeOut,animationFrame:animationFrame,idlePeriod:idlePeriod,microTask:microTask};const microtask=microTask,PropertiesChanged=dedupingMixin(superClass=>{class PropertiesChanged extends superClass{static createProperties(props){const proto=this.prototype;for(let prop in props){if(!(prop in proto)){proto._createPropertyAccessor(prop)}}}static attributeNameForProperty(property){return property.toLowerCase()}static typeForProperty(name){}_createPropertyAccessor(property,readOnly){this._addPropertyToAttributeMap(property);if(!this.hasOwnProperty("__dataHasAccessor")){this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)}if(!this.__dataHasAccessor[property]){this.__dataHasAccessor[property]=!0;this._definePropertyAccessor(property,readOnly)}}_addPropertyToAttributeMap(property){if(!this.hasOwnProperty("__dataAttributes")){this.__dataAttributes=Object.assign({},this.__dataAttributes)}if(!this.__dataAttributes[property]){const attr=this.constructor.attributeNameForProperty(property);this.__dataAttributes[attr]=property}}_definePropertyAccessor(property,readOnly){Object.defineProperty(this,property,{get(){return this._getProperty(property)},set:readOnly?function(){}:function(value){this._setProperty(property,value)}})}constructor(){super();this.__dataEnabled=!1;this.__dataReady=!1;this.__dataInvalid=!1;this.__data={};this.__dataPending=null;this.__dataOld=null;this.__dataInstanceProps=null;this.__serializing=!1;this._initializeProperties()}ready(){this.__dataReady=!0;this._flushProperties()}_initializeProperties(){for(let p in this.__dataHasAccessor){if(this.hasOwnProperty(p)){this.__dataInstanceProps=this.__dataInstanceProps||{};this.__dataInstanceProps[p]=this[p];delete this[p]}}}_initializeInstanceProperties(props){Object.assign(this,props)}_setProperty(property,value){if(this._setPendingProperty(property,value)){this._invalidateProperties()}}_getProperty(property){return this.__data[property]}_setPendingProperty(property,value,ext){let old=this.__data[property],changed=this._shouldPropertyChange(property,value,old);if(changed){if(!this.__dataPending){this.__dataPending={};this.__dataOld={}}if(this.__dataOld&&!(property in this.__dataOld)){this.__dataOld[property]=old}this.__data[property]=value;this.__dataPending[property]=value}return changed}_invalidateProperties(){if(!this.__dataInvalid&&this.__dataReady){this.__dataInvalid=!0;microtask.run(()=>{if(this.__dataInvalid){this.__dataInvalid=!1;this._flushProperties()}})}}_enableProperties(){if(!this.__dataEnabled){this.__dataEnabled=!0;if(this.__dataInstanceProps){this._initializeInstanceProperties(this.__dataInstanceProps);this.__dataInstanceProps=null}this.ready()}}_flushProperties(){const props=this.__data,changedProps=this.__dataPending,old=this.__dataOld;if(this._shouldPropertiesChange(props,changedProps,old)){this.__dataPending=null;this.__dataOld=null;this._propertiesChanged(props,changedProps,old)}}_shouldPropertiesChange(currentProps,changedProps,oldProps){return!!changedProps}_propertiesChanged(currentProps,changedProps,oldProps){}_shouldPropertyChange(property,value,old){return old!==value&&(old===old||value===value)}attributeChangedCallback(name,old,value,namespace){if(old!==value){this._attributeToProperty(name,value)}if(super.attributeChangedCallback){super.attributeChangedCallback(name,old,value,namespace)}}_attributeToProperty(attribute,value,type){if(!this.__serializing){const map=this.__dataAttributes,property=map&&map[attribute]||attribute;this[property]=this._deserializeValue(value,type||this.constructor.typeForProperty(property))}}_propertyToAttribute(property,attribute,value){this.__serializing=!0;value=3>arguments.length?this[property]:value;this._valueToNodeAttribute(this,value,attribute||this.constructor.attributeNameForProperty(property));this.__serializing=!1}_valueToNodeAttribute(node,value,attribute){const str=this._serializeValue(value);if(str===void 0){node.removeAttribute(attribute)}else{node.setAttribute(attribute,str)}}_serializeValue(value){switch(typeof value){case"boolean":return value?"":void 0;default:return null!=value?value.toString():void 0;}}_deserializeValue(value,type){switch(type){case Boolean:return null!==value;case Number:return+value;default:return value;}}}return PropertiesChanged});var propertiesChanged={PropertiesChanged:PropertiesChanged};const nativeProperties={};let proto=HTMLElement.prototype;while(proto){let props=Object.getOwnPropertyNames(proto);for(let i=0;i<props.length;i++){nativeProperties[props[i]]=!0}proto=Object.getPrototypeOf(proto)}function saveAccessorValue(model,property){if(!nativeProperties[property]){let value=model[property];if(value!==void 0){if(model.__data){model._setPendingProperty(property,value)}else{if(!model.__dataProto){model.__dataProto={}}else if(!model.hasOwnProperty(JSCompiler_renameProperty("__dataProto",model))){model.__dataProto=Object.create(model.__dataProto)}model.__dataProto[property]=value}}}}const PropertyAccessors=dedupingMixin(superClass=>{const base=PropertiesChanged(superClass);class PropertyAccessors extends base{static createPropertiesForAttributes(){let a$=this.observedAttributes;for(let i=0;i<a$.length;i++){this.prototype._createPropertyAccessor(dashToCamelCase(a$[i]))}}static attributeNameForProperty(property){return camelToDashCase(property)}_initializeProperties(){if(this.__dataProto){this._initializeProtoProperties(this.__dataProto);this.__dataProto=null}super._initializeProperties()}_initializeProtoProperties(props){for(let p in props){this._setProperty(p,props[p])}}_ensureAttribute(attribute,value){const el=this;if(!el.hasAttribute(attribute)){this._valueToNodeAttribute(el,value,attribute)}}_serializeValue(value){switch(typeof value){case"object":if(value instanceof Date){return value.toString()}else if(value){try{return JSON.stringify(value)}catch(x){return""}}default:return super._serializeValue(value);}}_deserializeValue(value,type){let outValue;switch(type){case Object:try{outValue=JSON.parse(value)}catch(x){outValue=value}break;case Array:try{outValue=JSON.parse(value)}catch(x){outValue=null;console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`)}break;case Date:outValue=isNaN(value)?value+"":+value;outValue=new Date(outValue);break;default:outValue=super._deserializeValue(value,type);break;}return outValue}_definePropertyAccessor(property,readOnly){saveAccessorValue(this,property);super._definePropertyAccessor(property,readOnly)}_hasAccessor(property){return this.__dataHasAccessor&&this.__dataHasAccessor[property]}_isPropertyPending(prop){return!!(this.__dataPending&&prop in this.__dataPending)}}return PropertyAccessors});var propertyAccessors={PropertyAccessors:PropertyAccessors};const templateExtensions={"dom-if":!0,"dom-repeat":!0};function wrapTemplateExtension(node){let is=node.getAttribute("is");if(is&&templateExtensions[is]){let t=node;t.removeAttribute("is");node=t.ownerDocument.createElement(is);t.parentNode.replaceChild(node,t);node.appendChild(t);while(t.attributes.length){node.setAttribute(t.attributes[0].name,t.attributes[0].value);t.removeAttribute(t.attributes[0].name)}}return node}function findTemplateNode(root,nodeInfo){let parent=nodeInfo.parentInfo&&findTemplateNode(root,nodeInfo.parentInfo);if(parent){for(let n=parent.firstChild,i=0;n;n=n.nextSibling){if(nodeInfo.parentIndex===i++){return n}}}else{return root}}function applyIdToMap(inst,map,node,nodeInfo){if(nodeInfo.id){map[nodeInfo.id]=node}}function applyEventListener(inst,node,nodeInfo){if(nodeInfo.events&&nodeInfo.events.length){for(let j=0,e$=nodeInfo.events,e;j<e$.length&&(e=e$[j]);j++){inst._addMethodEventListenerToNode(node,e.name,e.value,inst)}}}function applyTemplateContent(inst,node,nodeInfo){if(nodeInfo.templateInfo){node._templateInfo=nodeInfo.templateInfo}}function createNodeEventHandler(context,eventName,methodName){context=context._methodHost||context;let handler=function(e){if(context[methodName]){context[methodName](e,e.detail)}else{console.warn("listener method `"+methodName+"` not defined")}};return handler}const TemplateStamp=dedupingMixin(superClass=>{class TemplateStamp extends superClass{static _parseTemplate(template,outerTemplateInfo){if(!template._templateInfo){let templateInfo=template._templateInfo={};templateInfo.nodeInfoList=[];templateInfo.stripWhiteSpace=outerTemplateInfo&&outerTemplateInfo.stripWhiteSpace||template.hasAttribute("strip-whitespace");this._parseTemplateContent(template,templateInfo,{parent:null})}return template._templateInfo}static _parseTemplateContent(template,templateInfo,nodeInfo){return this._parseTemplateNode(template.content,templateInfo,nodeInfo)}static _parseTemplateNode(node,templateInfo,nodeInfo){let noted,element=node;if("template"==element.localName&&!element.hasAttribute("preserve-content")){noted=this._parseTemplateNestedTemplate(element,templateInfo,nodeInfo)||noted}else if("slot"===element.localName){templateInfo.hasInsertionPoint=!0}if(element.firstChild){noted=this._parseTemplateChildNodes(element,templateInfo,nodeInfo)||noted}if(element.hasAttributes&&element.hasAttributes()){noted=this._parseTemplateNodeAttributes(element,templateInfo,nodeInfo)||noted}return noted}static _parseTemplateChildNodes(root,templateInfo,nodeInfo){if("script"===root.localName||"style"===root.localName){return}for(let node=root.firstChild,parentIndex=0,next;node;node=next){if("template"==node.localName){node=wrapTemplateExtension(node)}next=node.nextSibling;if(node.nodeType===Node.TEXT_NODE){let n=next;while(n&&n.nodeType===Node.TEXT_NODE){node.textContent+=n.textContent;next=n.nextSibling;root.removeChild(n);n=next}if(templateInfo.stripWhiteSpace&&!node.textContent.trim()){root.removeChild(node);continue}}let childInfo={parentIndex,parentInfo:nodeInfo};if(this._parseTemplateNode(node,templateInfo,childInfo)){childInfo.infoIndex=templateInfo.nodeInfoList.push(childInfo)-1}if(node.parentNode){parentIndex++}}}static _parseTemplateNestedTemplate(node,outerTemplateInfo,nodeInfo){let templateInfo=this._parseTemplate(node,outerTemplateInfo),content=templateInfo.content=node.content.ownerDocument.createDocumentFragment();content.appendChild(node.content);nodeInfo.templateInfo=templateInfo;return!0}static _parseTemplateNodeAttributes(node,templateInfo,nodeInfo){let noted=!1,attrs=Array.from(node.attributes);for(let i=attrs.length-1,a;a=attrs[i];i--){noted=this._parseTemplateNodeAttribute(node,templateInfo,nodeInfo,a.name,a.value)||noted}return noted}static _parseTemplateNodeAttribute(node,templateInfo,nodeInfo,name,value){if("on-"===name.slice(0,3)){node.removeAttribute(name);nodeInfo.events=nodeInfo.events||[];nodeInfo.events.push({name:name.slice(3),value});return!0}else if("id"===name){nodeInfo.id=value;return!0}return!1}static _contentForTemplate(template){let templateInfo=template._templateInfo;return templateInfo&&templateInfo.content||template.content}_stampTemplate(template){if(template&&!template.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate){HTMLTemplateElement.decorate(template)}let templateInfo=this.constructor._parseTemplate(template),nodeInfo=templateInfo.nodeInfoList,content=templateInfo.content||template.content,dom=document.importNode(content,!0);dom.__noInsertionPoint=!templateInfo.hasInsertionPoint;let nodes=dom.nodeList=Array(nodeInfo.length);dom.$={};for(let i=0,l=nodeInfo.length,info,node;i<l&&(info=nodeInfo[i]);i++){node=nodes[i]=findTemplateNode(dom,info);applyIdToMap(this,dom.$,node,info);applyTemplateContent(this,node,info);applyEventListener(this,node,info)}dom=dom;return dom}_addMethodEventListenerToNode(node,eventName,methodName,context){context=context||node;let handler=createNodeEventHandler(context,eventName,methodName);this._addEventListenerToNode(node,eventName,handler);return handler}_addEventListenerToNode(node,eventName,handler){node.addEventListener(eventName,handler)}_removeEventListenerFromNode(node,eventName,handler){node.removeEventListener(eventName,handler)}}return TemplateStamp});var templateStamp={TemplateStamp:TemplateStamp};let dedupeId$1=0;const TYPES={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},capitalAttributeRegex=/[A-Z]/;let DataTrigger,DataEffect,PropertyEffectsType;function ensureOwnEffectMap(model,type){let effects=model[type];if(!effects){effects=model[type]={}}else if(!model.hasOwnProperty(type)){effects=model[type]=Object.create(model[type]);for(let p in effects){let protoFx=effects[p],instFx=effects[p]=Array(protoFx.length);for(let i=0;i<protoFx.length;i++){instFx[i]=protoFx[i]}}}return effects}function runEffects(inst,effects,props,oldProps,hasPaths,extraArgs){if(effects){let ran=!1,id=dedupeId$1++;for(let prop in props){if(runEffectsForProperty(inst,effects,id,prop,props,oldProps,hasPaths,extraArgs)){ran=!0}}return ran}return!1}function runEffectsForProperty(inst,effects,dedupeId,prop,props,oldProps,hasPaths,extraArgs){let ran=!1,rootProperty=hasPaths?root(prop):prop,fxs=effects[rootProperty];if(fxs){for(let i=0,l=fxs.length,fx;i<l&&(fx=fxs[i]);i++){if((!fx.info||fx.info.lastRun!==dedupeId)&&(!hasPaths||pathMatchesTrigger(prop,fx.trigger))){if(fx.info){fx.info.lastRun=dedupeId}fx.fn(inst,prop,props,oldProps,fx.info,hasPaths,extraArgs);ran=!0}}}return ran}function pathMatchesTrigger(path,trigger){if(trigger){let triggerPath=trigger.name;return triggerPath==path||trigger.structured&&isAncestor(triggerPath,path)||trigger.wildcard&&isDescendant(triggerPath,path)}else{return!0}}function runObserverEffect(inst,property,props,oldProps,info){let fn="string"===typeof info.method?inst[info.method]:info.method,changedProp=info.property;if(fn){fn.call(inst,inst.__data[changedProp],oldProps[changedProp])}else if(!info.dynamicFn){console.warn("observer method `"+info.method+"` not defined")}}function runNotifyEffects(inst,notifyProps,props,oldProps,hasPaths){let fxs=inst[TYPES.NOTIFY],notified,id=dedupeId$1++;for(let prop in notifyProps){if(notifyProps[prop]){if(fxs&&runEffectsForProperty(inst,fxs,id,prop,props,oldProps,hasPaths)){notified=!0}else if(hasPaths&&notifyPath(inst,prop,props)){notified=!0}}}let host;if(notified&&(host=inst.__dataHost)&&host._invalidateProperties){host._invalidateProperties()}}function notifyPath(inst,path,props){let rootProperty=root(path);if(rootProperty!==path){let eventName=camelToDashCase(rootProperty)+"-changed";dispatchNotifyEvent(inst,eventName,props[path],path);return!0}return!1}function dispatchNotifyEvent(inst,eventName,value,path){let detail={value:value,queueProperty:!0};if(path){detail.path=path}inst.dispatchEvent(new CustomEvent(eventName,{detail}))}function runNotifyEffect(inst,property,props,oldProps,info,hasPaths){let rootProperty=hasPaths?root(property):property,path=rootProperty!=property?property:null,value=path?get(inst,path):inst.__data[property];if(path&&value===void 0){value=props[property]}dispatchNotifyEvent(inst,info.eventName,value,path)}function handleNotification(event,inst,fromProp,toPath,negate){let value,detail=event.detail,fromPath=detail&&detail.path;if(fromPath){toPath=translate$1(fromProp,toPath,fromPath);value=detail&&detail.value}else{value=event.currentTarget[fromProp]}value=negate?!value:value;if(!inst[TYPES.READ_ONLY]||!inst[TYPES.READ_ONLY][toPath]){if(inst._setPendingPropertyOrPath(toPath,value,!0,!!fromPath)&&(!detail||!detail.queueProperty)){inst._invalidateProperties()}}}function runReflectEffect(inst,property,props,oldProps,info){let value=inst.__data[property];if(sanitizeDOMValue){value=sanitizeDOMValue(value,info.attrName,"attribute",inst)}inst._propertyToAttribute(property,info.attrName,value)}function runComputedEffects(inst,changedProps,oldProps,hasPaths){let computeEffects=inst[TYPES.COMPUTE];if(computeEffects){let inputProps=changedProps;while(runEffects(inst,computeEffects,inputProps,oldProps,hasPaths)){Object.assign(oldProps,inst.__dataOld);Object.assign(changedProps,inst.__dataPending);inputProps=inst.__dataPending;inst.__dataPending=null}}}function runComputedEffect(inst,property,props,oldProps,info){let result=runMethodEffect(inst,property,props,oldProps,info),computedProp=info.methodInfo;if(inst.__dataHasAccessor&&inst.__dataHasAccessor[computedProp]){inst._setPendingProperty(computedProp,result,!0)}else{inst[computedProp]=result}}function computeLinkedPaths(inst,path,value){let links=inst.__dataLinkedPaths;if(links){let link;for(let a in links){let b=links[a];if(isDescendant(a,path)){link=translate$1(a,b,path);inst._setPendingPropertyOrPath(link,value,!0,!0)}else if(isDescendant(b,path)){link=translate$1(b,a,path);inst._setPendingPropertyOrPath(link,value,!0,!0)}}}}function addBinding(constructor,templateInfo,nodeInfo,kind,target,parts,literal){nodeInfo.bindings=nodeInfo.bindings||[];let binding={kind,target,parts,literal,isCompound:1!==parts.length};nodeInfo.bindings.push(binding);if(shouldAddListener(binding)){let{event,negate}=binding.parts[0];binding.listenerEvent=event||camelToDashCase(target)+"-changed";binding.listenerNegate=negate}let index=templateInfo.nodeInfoList.length;for(let i=0,part;i<binding.parts.length;i++){part=binding.parts[i];part.compoundIndex=i;addEffectForBindingPart(constructor,templateInfo,binding,part,index)}}function addEffectForBindingPart(constructor,templateInfo,binding,part,index){if(!part.literal){if("attribute"===binding.kind&&"-"===binding.target[0]){console.warn("Cannot set attribute "+binding.target+" because \"-\" is not a valid attribute starting character")}else{let dependencies=part.dependencies,info={index,binding,part,evaluator:constructor};for(let j=0,trigger;j<dependencies.length;j++){trigger=dependencies[j];if("string"==typeof trigger){trigger=parseArg(trigger);trigger.wildcard=!0}constructor._addTemplatePropertyEffect(templateInfo,trigger.rootProperty,{fn:runBindingEffect,info,trigger})}}}}function runBindingEffect(inst,path,props,oldProps,info,hasPaths,nodeList){let node=nodeList[info.index],binding=info.binding,part=info.part;if(hasPaths&&part.source&&path.length>part.source.length&&"property"==binding.kind&&!binding.isCompound&&node.__isPropertyEffectsClient&&node.__dataHasAccessor&&node.__dataHasAccessor[binding.target]){let value=props[path];path=translate$1(part.source,binding.target,path);if(node._setPendingPropertyOrPath(path,value,!1,!0)){inst._enqueueClient(node)}}else{let value=info.evaluator._evaluateBinding(inst,part,path,props,oldProps,hasPaths);applyBindingValue(inst,node,binding,part,value)}}function applyBindingValue(inst,node,binding,part,value){value=computeBindingValue(node,value,binding,part);if(sanitizeDOMValue){value=sanitizeDOMValue(value,binding.target,binding.kind,node)}if("attribute"==binding.kind){inst._valueToNodeAttribute(node,value,binding.target)}else{let prop=binding.target;if(node.__isPropertyEffectsClient&&node.__dataHasAccessor&&node.__dataHasAccessor[prop]){if(!node[TYPES.READ_ONLY]||!node[TYPES.READ_ONLY][prop]){if(node._setPendingProperty(prop,value)){inst._enqueueClient(node)}}}else{inst._setUnmanagedPropertyToNode(node,prop,value)}}}function computeBindingValue(node,value,binding,part){if(binding.isCompound){let storage=node.__dataCompoundStorage[binding.target];storage[part.compoundIndex]=value;value=storage.join("")}if("attribute"!==binding.kind){if("textContent"===binding.target||"value"===binding.target&&("input"===node.localName||"textarea"===node.localName)){value=value==void 0?"":value}}return value}function shouldAddListener(binding){return!!binding.target&&"attribute"!=binding.kind&&"text"!=binding.kind&&!binding.isCompound&&"{"===binding.parts[0].mode}function setupBindings(inst,templateInfo){let{nodeList,nodeInfoList}=templateInfo;if(nodeInfoList.length){for(let i=0;i<nodeInfoList.length;i++){let info=nodeInfoList[i],node=nodeList[i],bindings=info.bindings;if(bindings){for(let i=0,binding;i<bindings.length;i++){binding=bindings[i];setupCompoundStorage(node,binding);addNotifyListener(node,inst,binding)}}node.__dataHost=inst}}}function setupCompoundStorage(node,binding){if(binding.isCompound){let storage=node.__dataCompoundStorage||(node.__dataCompoundStorage={}),parts=binding.parts,literals=Array(parts.length);for(let j=0;j<parts.length;j++){literals[j]=parts[j].literal}let target=binding.target;storage[target]=literals;if(binding.literal&&"property"==binding.kind){node[target]=binding.literal}}}function addNotifyListener(node,inst,binding){if(binding.listenerEvent){let part=binding.parts[0];node.addEventListener(binding.listenerEvent,function(e){handleNotification(e,inst,binding.target,part.source,part.negate)})}}function createMethodEffect(model,sig,type,effectFn,methodInfo,dynamicFn){dynamicFn=sig.static||dynamicFn&&("object"!==typeof dynamicFn||dynamicFn[sig.methodName]);let info={methodName:sig.methodName,args:sig.args,methodInfo,dynamicFn};for(let i=0,arg;i<sig.args.length&&(arg=sig.args[i]);i++){if(!arg.literal){model._addPropertyEffect(arg.rootProperty,type,{fn:effectFn,info:info,trigger:arg})}}if(dynamicFn){model._addPropertyEffect(sig.methodName,type,{fn:effectFn,info:info})}}function runMethodEffect(inst,property,props,oldProps,info){let context=inst._methodHost||inst,fn=context[info.methodName];if(fn){let args=inst._marshalArgs(info.args,property,props);return fn.apply(context,args)}else if(!info.dynamicFn){console.warn("method `"+info.methodName+"` not defined")}}const emptyArray=[],IDENT="(?:"+"[a-zA-Z_$][\\w.:$\\-*]*"+")",NUMBER="(?:"+"[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?"+")",SQUOTE_STRING="(?:"+"'(?:[^'\\\\]|\\\\.)*'"+")",DQUOTE_STRING="(?:"+"\"(?:[^\"\\\\]|\\\\.)*\""+")",STRING="(?:"+SQUOTE_STRING+"|"+DQUOTE_STRING+")",ARGUMENT="(?:("+IDENT+"|"+NUMBER+"|"+STRING+")\\s*"+")",ARGUMENTS="(?:"+ARGUMENT+"(?:,\\s*"+ARGUMENT+")*"+")",ARGUMENT_LIST="(?:"+"\\(\\s*"+"(?:"+ARGUMENTS+"?"+")"+"\\)\\s*"+")",BINDING="("+IDENT+"\\s*"+ARGUMENT_LIST+"?"+")",OPEN_BRACKET="(\\[\\[|{{)"+"\\s*",CLOSE_BRACKET="(?:]]|}})",NEGATE="(?:(!)\\s*)?",EXPRESSION=OPEN_BRACKET+NEGATE+BINDING+CLOSE_BRACKET,bindingRegex=new RegExp(EXPRESSION,"g");function literalFromParts(parts){let s="";for(let i=0,literal;i<parts.length;i++){literal=parts[i].literal;s+=literal||""}return s}function parseMethod(expression){let m=expression.match(/([^\s]+?)\(([\s\S]*)\)/);if(m){let methodName=m[1],sig={methodName,static:!0,args:emptyArray};if(m[2].trim()){let args=m[2].replace(/\\,/g,"&comma;").split(",");return parseArgs(args,sig)}else{return sig}}return null}function parseArgs(argList,sig){sig.args=argList.map(function(rawArg){let arg=parseArg(rawArg);if(!arg.literal){sig.static=!1}return arg},this);return sig}function parseArg(rawArg){let arg=rawArg.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),a={name:arg,value:"",literal:!1},fc=arg[0];if("-"===fc){fc=arg[1]}if("0"<=fc&&"9">=fc){fc="#"}switch(fc){case"'":case"\"":a.value=arg.slice(1,-1);a.literal=!0;break;case"#":a.value=+arg;a.literal=!0;break;}if(!a.literal){a.rootProperty=root(arg);a.structured=isPath(arg);if(a.structured){a.wildcard=".*"==arg.slice(-2);if(a.wildcard){a.name=arg.slice(0,-2)}}}return a}function notifySplices(inst,array,path,splices){let splicesPath=path+".splices";inst.notifyPath(splicesPath,{indexSplices:splices});inst.notifyPath(path+".length",array.length);inst.__data[splicesPath]={indexSplices:null}}function notifySplice(inst,array,path,index,addedCount,removed){notifySplices(inst,array,path,[{index:index,addedCount:addedCount,removed:removed,object:array,type:"splice"}])}function upper(name){return name[0].toUpperCase()+name.substring(1)}const PropertyEffects=dedupingMixin(superClass=>{const propertyEffectsBase=TemplateStamp(PropertyAccessors(superClass));class PropertyEffects extends propertyEffectsBase{constructor(){super();this.__isPropertyEffectsClient=!0;this.__dataCounter=0;this.__dataClientsReady;this.__dataPendingClients;this.__dataToNotify;this.__dataLinkedPaths;this.__dataHasPaths;this.__dataCompoundStorage;this.__dataHost;this.__dataTemp;this.__dataClientsInitialized;this.__data;this.__dataPending;this.__dataOld;this.__computeEffects;this.__reflectEffects;this.__notifyEffects;this.__propagateEffects;this.__observeEffects;this.__readOnly;this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return TYPES}_initializeProperties(){super._initializeProperties();hostStack.registerHost(this);this.__dataClientsReady=!1;this.__dataPendingClients=null;this.__dataToNotify=null;this.__dataLinkedPaths=null;this.__dataHasPaths=!1;this.__dataCompoundStorage=this.__dataCompoundStorage||null;this.__dataHost=this.__dataHost||null;this.__dataTemp={};this.__dataClientsInitialized=!1}_initializeProtoProperties(props){this.__data=Object.create(props);this.__dataPending=Object.create(props);this.__dataOld={}}_initializeInstanceProperties(props){let readOnly=this[TYPES.READ_ONLY];for(let prop in props){if(!readOnly||!readOnly[prop]){this.__dataPending=this.__dataPending||{};this.__dataOld=this.__dataOld||{};this.__data[prop]=this.__dataPending[prop]=props[prop]}}}_addPropertyEffect(property,type,effect){this._createPropertyAccessor(property,type==TYPES.READ_ONLY);let effects=ensureOwnEffectMap(this,type)[property];if(!effects){effects=this[type][property]=[]}effects.push(effect)}_removePropertyEffect(property,type,effect){let effects=ensureOwnEffectMap(this,type)[property],idx=effects.indexOf(effect);if(0<=idx){effects.splice(idx,1)}}_hasPropertyEffect(property,type){let effects=this[type];return!!(effects&&effects[property])}_hasReadOnlyEffect(property){return this._hasPropertyEffect(property,TYPES.READ_ONLY)}_hasNotifyEffect(property){return this._hasPropertyEffect(property,TYPES.NOTIFY)}_hasReflectEffect(property){return this._hasPropertyEffect(property,TYPES.REFLECT)}_hasComputedEffect(property){return this._hasPropertyEffect(property,TYPES.COMPUTE)}_setPendingPropertyOrPath(path,value,shouldNotify,isPathNotification){if(isPathNotification||root(Array.isArray(path)?path[0]:path)!==path){if(!isPathNotification){let old=get(this,path);path=set(this,path,value);if(!path||!super._shouldPropertyChange(path,value,old)){return!1}}this.__dataHasPaths=!0;if(this._setPendingProperty(path,value,shouldNotify)){computeLinkedPaths(this,path,value);return!0}}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[path]){return this._setPendingProperty(path,value,shouldNotify)}else{this[path]=value}}return!1}_setUnmanagedPropertyToNode(node,prop,value){if(value!==node[prop]||"object"==typeof value){node[prop]=value}}_setPendingProperty(property,value,shouldNotify){let propIsPath=this.__dataHasPaths&&isPath(property),prevProps=propIsPath?this.__dataTemp:this.__data;if(this._shouldPropertyChange(property,value,prevProps[property])){if(!this.__dataPending){this.__dataPending={};this.__dataOld={}}if(!(property in this.__dataOld)){this.__dataOld[property]=this.__data[property]}if(propIsPath){this.__dataTemp[property]=value}else{this.__data[property]=value}this.__dataPending[property]=value;if(propIsPath||this[TYPES.NOTIFY]&&this[TYPES.NOTIFY][property]){this.__dataToNotify=this.__dataToNotify||{};this.__dataToNotify[property]=shouldNotify}return!0}return!1}_setProperty(property,value){if(this._setPendingProperty(property,value,!0)){this._invalidateProperties()}}_invalidateProperties(){if(this.__dataReady){this._flushProperties()}}_enqueueClient(client){this.__dataPendingClients=this.__dataPendingClients||[];if(client!==this){this.__dataPendingClients.push(client)}}_flushProperties(){this.__dataCounter++;super._flushProperties();this.__dataCounter--}_flushClients(){if(!this.__dataClientsReady){this.__dataClientsReady=!0;this._readyClients();this.__dataReady=!0}else{this.__enableOrFlushClients()}}__enableOrFlushClients(){let clients=this.__dataPendingClients;if(clients){this.__dataPendingClients=null;for(let i=0,client;i<clients.length;i++){client=clients[i];if(!client.__dataEnabled){client._enableProperties()}else if(client.__dataPending){client._flushProperties()}}}}_readyClients(){this.__enableOrFlushClients()}setProperties(props,setReadOnly){for(let path in props){if(setReadOnly||!this[TYPES.READ_ONLY]||!this[TYPES.READ_ONLY][path]){this._setPendingPropertyOrPath(path,props[path],!0)}}this._invalidateProperties()}ready(){this._flushProperties();if(!this.__dataClientsReady){this._flushClients()}if(this.__dataPending){this._flushProperties()}}_propertiesChanged(currentProps,changedProps,oldProps){let hasPaths=this.__dataHasPaths;this.__dataHasPaths=!1;runComputedEffects(this,changedProps,oldProps,hasPaths);let notifyProps=this.__dataToNotify;this.__dataToNotify=null;this._propagatePropertyChanges(changedProps,oldProps,hasPaths);this._flushClients();runEffects(this,this[TYPES.REFLECT],changedProps,oldProps,hasPaths);runEffects(this,this[TYPES.OBSERVE],changedProps,oldProps,hasPaths);if(notifyProps){runNotifyEffects(this,notifyProps,changedProps,oldProps,hasPaths)}if(1==this.__dataCounter){this.__dataTemp={}}}_propagatePropertyChanges(changedProps,oldProps,hasPaths){if(this[TYPES.PROPAGATE]){runEffects(this,this[TYPES.PROPAGATE],changedProps,oldProps,hasPaths)}let templateInfo=this.__templateInfo;while(templateInfo){runEffects(this,templateInfo.propertyEffects,changedProps,oldProps,hasPaths,templateInfo.nodeList);templateInfo=templateInfo.nextTemplateInfo}}linkPaths(to,from){to=normalize(to);from=normalize(from);this.__dataLinkedPaths=this.__dataLinkedPaths||{};this.__dataLinkedPaths[to]=from}unlinkPaths(path){path=normalize(path);if(this.__dataLinkedPaths){delete this.__dataLinkedPaths[path]}}notifySplices(path,splices){let info={path:""},array=get(this,path,info);notifySplices(this,array,info.path,splices)}get(path,root$$1){return get(root$$1||this,path)}set(path,value,root$$1){if(root$$1){set(root$$1,path,value)}else{if(!this[TYPES.READ_ONLY]||!this[TYPES.READ_ONLY][path]){if(this._setPendingPropertyOrPath(path,value,!0)){this._invalidateProperties()}}}}push(path,...items){let info={path:""},array=get(this,path,info),len=array.length,ret=array.push(...items);if(items.length){notifySplice(this,array,info.path,len,items.length,[])}return ret}pop(path){let info={path:""},array=get(this,path,info),hadLength=!!array.length,ret=array.pop();if(hadLength){notifySplice(this,array,info.path,array.length,0,[ret])}return ret}splice(path,start,deleteCount,...items){var _Mathfloor=Math.floor;let info={path:""},array=get(this,path,info);if(0>start){start=array.length-_Mathfloor(-start)}else if(start){start=_Mathfloor(start)}let ret;if(2===arguments.length){ret=array.splice(start)}else{ret=array.splice(start,deleteCount,...items)}if(items.length||ret.length){notifySplice(this,array,info.path,start,items.length,ret)}return ret}shift(path){let info={path:""},array=get(this,path,info),hadLength=!!array.length,ret=array.shift();if(hadLength){notifySplice(this,array,info.path,0,0,[ret])}return ret}unshift(path,...items){let info={path:""},array=get(this,path,info),ret=array.unshift(...items);if(items.length){notifySplice(this,array,info.path,0,items.length,[])}return ret}notifyPath(path,value){let propPath;if(1==arguments.length){let info={path:""};value=get(this,path,info);propPath=info.path}else if(Array.isArray(path)){propPath=normalize(path)}else{propPath=path}if(this._setPendingPropertyOrPath(propPath,value,!0,!0)){this._invalidateProperties()}}_createReadOnlyProperty(property,protectedSetter){this._addPropertyEffect(property,TYPES.READ_ONLY);if(protectedSetter){this["_set"+upper(property)]=function(value){this._setProperty(property,value)}}}_createPropertyObserver(property,method,dynamicFn){let info={property,method,dynamicFn:!!dynamicFn};this._addPropertyEffect(property,TYPES.OBSERVE,{fn:runObserverEffect,info,trigger:{name:property}});if(dynamicFn){this._addPropertyEffect(method,TYPES.OBSERVE,{fn:runObserverEffect,info,trigger:{name:method}})}}_createMethodObserver(expression,dynamicFn){let sig=parseMethod(expression);if(!sig){throw new Error("Malformed observer expression '"+expression+"'")}createMethodEffect(this,sig,TYPES.OBSERVE,runMethodEffect,null,dynamicFn)}_createNotifyingProperty(property){this._addPropertyEffect(property,TYPES.NOTIFY,{fn:runNotifyEffect,info:{eventName:camelToDashCase(property)+"-changed",property:property}})}_createReflectedProperty(property){let attr=this.constructor.attributeNameForProperty(property);if("-"===attr[0]){console.warn("Property "+property+" cannot be reflected to attribute "+attr+" because \"-\" is not a valid starting attribute name. Use a lowercase first letter for the property instead.")}else{this._addPropertyEffect(property,TYPES.REFLECT,{fn:runReflectEffect,info:{attrName:attr}})}}_createComputedProperty(property,expression,dynamicFn){let sig=parseMethod(expression);if(!sig){throw new Error("Malformed computed expression '"+expression+"'")}createMethodEffect(this,sig,TYPES.COMPUTE,runComputedEffect,property,dynamicFn)}_marshalArgs(args,path,props){const data=this.__data;let values=[];for(let i=0,l=args.length;i<l;i++){let arg=args[i],name=arg.name,v;if(arg.literal){v=arg.value}else{if(arg.structured){v=get(data,name);if(v===void 0){v=props[name]}}else{v=data[name]}}if(arg.wildcard){let baseChanged=0===name.indexOf(path+"."),matches$$1=0===path.indexOf(name)&&!baseChanged;values[i]={path:matches$$1?path:name,value:matches$$1?props[path]:v,base:v}}else{values[i]=v}}return values}static addPropertyEffect(property,type,effect){this.prototype._addPropertyEffect(property,type,effect)}static createPropertyObserver(property,method,dynamicFn){this.prototype._createPropertyObserver(property,method,dynamicFn)}static createMethodObserver(expression,dynamicFn){this.prototype._createMethodObserver(expression,dynamicFn)}static createNotifyingProperty(property){this.prototype._createNotifyingProperty(property)}static createReadOnlyProperty(property,protectedSetter){this.prototype._createReadOnlyProperty(property,protectedSetter)}static createReflectedProperty(property){this.prototype._createReflectedProperty(property)}static createComputedProperty(property,expression,dynamicFn){this.prototype._createComputedProperty(property,expression,dynamicFn)}static bindTemplate(template){return this.prototype._bindTemplate(template)}_bindTemplate(template,instanceBinding){let templateInfo=this.constructor._parseTemplate(template),wasPreBound=this.__templateInfo==templateInfo;if(!wasPreBound){for(let prop in templateInfo.propertyEffects){this._createPropertyAccessor(prop)}}if(instanceBinding){templateInfo=Object.create(templateInfo);templateInfo.wasPreBound=wasPreBound;if(!wasPreBound&&this.__templateInfo){let last=this.__templateInfoLast||this.__templateInfo;this.__templateInfoLast=last.nextTemplateInfo=templateInfo;templateInfo.previousTemplateInfo=last;return templateInfo}}return this.__templateInfo=templateInfo}static _addTemplatePropertyEffect(templateInfo,prop,effect){let hostProps=templateInfo.hostProps=templateInfo.hostProps||{};hostProps[prop]=!0;let effects=templateInfo.propertyEffects=templateInfo.propertyEffects||{},propEffects=effects[prop]=effects[prop]||[];propEffects.push(effect)}_stampTemplate(template){hostStack.beginHosting(this);let dom=super._stampTemplate(template);hostStack.endHosting(this);let templateInfo=this._bindTemplate(template,!0);templateInfo.nodeList=dom.nodeList;if(!templateInfo.wasPreBound){let nodes=templateInfo.childNodes=[];for(let n=dom.firstChild;n;n=n.nextSibling){nodes.push(n)}}dom.templateInfo=templateInfo;setupBindings(this,templateInfo);if(this.__dataReady){runEffects(this,templateInfo.propertyEffects,this.__data,null,!1,templateInfo.nodeList)}return dom}_removeBoundDom(dom){let templateInfo=dom.templateInfo;if(templateInfo.previousTemplateInfo){templateInfo.previousTemplateInfo.nextTemplateInfo=templateInfo.nextTemplateInfo}if(templateInfo.nextTemplateInfo){templateInfo.nextTemplateInfo.previousTemplateInfo=templateInfo.previousTemplateInfo}if(this.__templateInfoLast==templateInfo){this.__templateInfoLast=templateInfo.previousTemplateInfo}templateInfo.previousTemplateInfo=templateInfo.nextTemplateInfo=null;let nodes=templateInfo.childNodes;for(let i=0,node;i<nodes.length;i++){node=nodes[i];node.parentNode.removeChild(node)}}static _parseTemplateNode(node,templateInfo,nodeInfo){let noted=super._parseTemplateNode(node,templateInfo,nodeInfo);if(node.nodeType===Node.TEXT_NODE){let parts=this._parseBindings(node.textContent,templateInfo);if(parts){node.textContent=literalFromParts(parts)||" ";addBinding(this,templateInfo,nodeInfo,"text","textContent",parts);noted=!0}}return noted}static _parseTemplateNodeAttribute(node,templateInfo,nodeInfo,name,value){let parts=this._parseBindings(value,templateInfo);if(parts){let origName=name,kind="property";if(capitalAttributeRegex.test(name)){kind="attribute"}else if("$"==name[name.length-1]){name=name.slice(0,-1);kind="attribute"}let literal=literalFromParts(parts);if(literal&&"attribute"==kind){node.setAttribute(name,literal)}if("input"===node.localName&&"value"===origName){node.setAttribute(origName,"")}node.removeAttribute(origName);if("property"===kind){name=dashToCamelCase(name)}addBinding(this,templateInfo,nodeInfo,kind,name,parts,literal);return!0}else{return super._parseTemplateNodeAttribute(node,templateInfo,nodeInfo,name,value)}}static _parseTemplateNestedTemplate(node,templateInfo,nodeInfo){let noted=super._parseTemplateNestedTemplate(node,templateInfo,nodeInfo),hostProps=nodeInfo.templateInfo.hostProps,mode="{";for(let source in hostProps){let parts=[{mode,source,dependencies:[source]}];addBinding(this,templateInfo,nodeInfo,"property","_host_"+source,parts)}return noted}static _parseBindings(text,templateInfo){let parts=[],lastIndex=0,m;while(null!==(m=bindingRegex.exec(text))){if(m.index>lastIndex){parts.push({literal:text.slice(lastIndex,m.index)})}let mode=m[1][0],negate=!!m[2],source=m[3].trim(),customEvent=!1,notifyEvent="",colon=-1;if("{"==mode&&0<(colon=source.indexOf("::"))){notifyEvent=source.substring(colon+2);source=source.substring(0,colon);customEvent=!0}let signature=parseMethod(source),dependencies=[];if(signature){let{args,methodName}=signature;for(let i=0,arg;i<args.length;i++){arg=args[i];if(!arg.literal){dependencies.push(arg)}}let dynamicFns=templateInfo.dynamicFns;if(dynamicFns&&dynamicFns[methodName]||signature.static){dependencies.push(methodName);signature.dynamicFn=!0}}else{dependencies.push(source)}parts.push({source,mode,negate,customEvent,signature,dependencies,event:notifyEvent});lastIndex=bindingRegex.lastIndex}if(lastIndex&&lastIndex<text.length){let literal=text.substring(lastIndex);if(literal){parts.push({literal:literal})}}if(parts.length){return parts}else{return null}}static _evaluateBinding(inst,part,path,props,oldProps,hasPaths){let value;if(part.signature){value=runMethodEffect(inst,path,props,oldProps,part.signature)}else if(path!=part.source){value=get(inst,part.source)}else{if(hasPaths&&isPath(path)){value=get(inst,path)}else{value=inst.__data[path]}}if(part.negate){value=!value}return value}}PropertyEffectsType=PropertyEffects;return PropertyEffects});class HostStack{constructor(){this.stack=[]}registerHost(inst){if(this.stack.length){let host=this.stack[this.stack.length-1];host._enqueueClient(inst)}}beginHosting(inst){this.stack.push(inst)}endHosting(inst){let stackLen=this.stack.length;if(stackLen&&this.stack[stackLen-1]==inst){this.stack.pop()}}}const hostStack=new HostStack;var propertyEffects={PropertyEffects:PropertyEffects};function normalizeProperties(props){const output={};for(let p in props){const o=props[p];output[p]="function"===typeof o?{type:o}:o}return output}const PropertiesMixin=dedupingMixin(superClass=>{const base=PropertiesChanged(superClass);function superPropertiesClass(constructor){const superCtor=Object.getPrototypeOf(constructor);return superCtor.prototype instanceof PropertiesMixin?superCtor:null}function ownProperties(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",constructor))){let props=null;if(constructor.hasOwnProperty(JSCompiler_renameProperty("properties",constructor))){const properties=constructor.properties;if(properties){props=normalizeProperties(properties)}}constructor.__ownProperties=props}return constructor.__ownProperties}class PropertiesMixin extends base{static get observedAttributes(){const props=this._properties;return props?Object.keys(props).map(p=>this.attributeNameForProperty(p)):[]}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const superCtor=superPropertiesClass(this);if(superCtor){superCtor.finalize()}this.__finalized=!0;this._finalizeClass()}}static _finalizeClass(){const props=ownProperties(this);if(props){this.createProperties(props)}}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const superCtor=superPropertiesClass(this);this.__properties=Object.assign({},superCtor&&superCtor._properties,ownProperties(this))}return this.__properties}static typeForProperty(name){const info=this._properties[name];return info&&info.type}_initializeProperties(){this.constructor.finalize();super._initializeProperties()}connectedCallback(){if(super.connectedCallback){super.connectedCallback()}this._enableProperties()}disconnectedCallback(){if(super.disconnectedCallback){super.disconnectedCallback()}}}return PropertiesMixin});var propertiesMixin={PropertiesMixin:PropertiesMixin};const bundledImportMeta={...import.meta,url:new URL("../../node_modules/%40polymer/polymer/lib/mixins/element-mixin.js",import.meta.url).href},version="3.0.5",ElementMixin=dedupingMixin(base=>{const polymerElementBase=PropertiesMixin(PropertyEffects(base));function propertyDefaults(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",constructor))){constructor.__propertyDefaults=null;let props=constructor._properties;for(let p in props){let info=props[p];if("value"in info){constructor.__propertyDefaults=constructor.__propertyDefaults||{};constructor.__propertyDefaults[p]=info}}}return constructor.__propertyDefaults}function ownObservers(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__ownObservers",constructor))){constructor.__ownObservers=constructor.hasOwnProperty(JSCompiler_renameProperty("observers",constructor))?constructor.observers:null}return constructor.__ownObservers}function createPropertyFromConfig(proto,name,info,allProps){if(info.computed){info.readOnly=!0}if(info.computed&&!proto._hasReadOnlyEffect(name)){proto._createComputedProperty(name,info.computed,allProps)}if(info.readOnly&&!proto._hasReadOnlyEffect(name)){proto._createReadOnlyProperty(name,!info.computed)}if(info.reflectToAttribute&&!proto._hasReflectEffect(name)){proto._createReflectedProperty(name)}if(info.notify&&!proto._hasNotifyEffect(name)){proto._createNotifyingProperty(name)}if(info.observer){proto._createPropertyObserver(name,info.observer,allProps[info.observer])}proto._addPropertyToAttributeMap(name)}function processElementStyles(klass,template,is,baseURI){const templateStyles=template.content.querySelectorAll("style"),stylesWithImports=stylesFromTemplate(template),linkedStyles=stylesFromModuleImports(is),firstTemplateChild=template.content.firstElementChild;for(let idx=0,s;idx<linkedStyles.length;idx++){s=linkedStyles[idx];s.textContent=klass._processStyleText(s.textContent,baseURI);template.content.insertBefore(s,firstTemplateChild)}let templateStyleIndex=0;for(let i=0;i<stylesWithImports.length;i++){let s=stylesWithImports[i],templateStyle=templateStyles[templateStyleIndex];if(templateStyle!==s){s=s.cloneNode(!0);templateStyle.parentNode.insertBefore(s,templateStyle)}else{templateStyleIndex++}s.textContent=klass._processStyleText(s.textContent,baseURI)}if(window.ShadyCSS){window.ShadyCSS.prepareTemplate(template,is)}}function getTemplateFromDomModule(is){let template=null;if(is&&(!strictTemplatePolicy||allowTemplateFromDomModule)){template=DomModule.import(is,"template");if(strictTemplatePolicy&&!template){throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${is}`)}}return template}class PolymerElement extends polymerElementBase{static get polymerElementVersion(){return version}static _finalizeClass(){super._finalizeClass();if(this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&this.is){register(this.prototype)}const observers=ownObservers(this);if(observers){this.createObservers(observers,this._properties)}let template=this.template;if(template){if("string"===typeof template){console.error("template getter must return HTMLTemplateElement");template=null}else{template=template.cloneNode(!0)}}this.prototype._template=template}static createProperties(props){for(let p in props){createPropertyFromConfig(this.prototype,p,props[p],props)}}static createObservers(observers,dynamicFns){const proto=this.prototype;for(let i=0;i<observers.length;i++){proto._createMethodObserver(observers[i],dynamicFns)}}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:getTemplateFromDomModule(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(value){this._template=value}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const meta=this.importMeta;if(meta){this._importPath=pathFromUrl(meta.url)}else{const module=DomModule.import(this.is);this._importPath=module&&module.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super();this._template;this._importPath;this.rootPath;this.importPath;this.root;this.$}_initializeProperties(){instanceCount++;this.constructor.finalize();this.constructor._finalizeTemplate(this.localName);super._initializeProperties();this.rootPath=rootPath;this.importPath=this.constructor.importPath;let p$=propertyDefaults(this.constructor);if(!p$){return}for(let p in p$){let info=p$[p];if(!this.hasOwnProperty(p)){let value="function"==typeof info.value?info.value.call(this):info.value;if(this._hasAccessor(p)){this._setPendingProperty(p,value,!0)}else{this[p]=value}}}}static _processStyleText(cssText,baseURI){return resolveCss(cssText,baseURI)}static _finalizeTemplate(is){const template=this.prototype._template;if(template&&!template.__polymerFinalized){template.__polymerFinalized=!0;const importPath=this.importPath,baseURI=importPath?resolveUrl(importPath):"";processElementStyles(this,template,is,baseURI);this.prototype._bindTemplate(template)}}connectedCallback(){if(window.ShadyCSS&&this._template){window.ShadyCSS.styleElement(this)}super.connectedCallback()}ready(){if(this._template){this.root=this._stampTemplate(this._template);this.$=this.root.$}super.ready()}_readyClients(){if(this._template){this.root=this._attachDom(this.root)}super._readyClients()}_attachDom(dom){if(this.attachShadow){if(dom){if(!this.shadowRoot){this.attachShadow({mode:"open"})}this.shadowRoot.appendChild(dom);return this.shadowRoot}return null}else{throw new Error("ShadowDOM not available. "+"PolymerElement can create dom as children instead of in "+"ShadowDOM by setting `this.root = this;` before `ready`.")}}updateStyles(properties){if(window.ShadyCSS){window.ShadyCSS.styleSubtree(this,properties)}}resolveUrl(url,base){if(!base&&this.importPath){base=resolveUrl(this.importPath)}return resolveUrl(url,base)}static _parseTemplateContent(template,templateInfo,nodeInfo){templateInfo.dynamicFns=templateInfo.dynamicFns||this._properties;return super._parseTemplateContent(template,templateInfo,nodeInfo)}}return PolymerElement});let instanceCount=0;const registrations=[];function _regLog(prototype){console.log("["+prototype.is+"]: registered")}function register(prototype){registrations.push(prototype)}function dumpRegistrations(){registrations.forEach(_regLog)}const updateStyles=function(props){if(window.ShadyCSS){window.ShadyCSS.styleDocument(props)}};var elementMixin={version:version,ElementMixin:ElementMixin,get instanceCount(){return instanceCount},registrations:registrations,register:register,dumpRegistrations:dumpRegistrations,updateStyles:updateStyles};class LiteralString{constructor(string){this.value=string.toString()}toString(){return this.value}}function literalValue(value){if(value instanceof LiteralString){return value.value}else{throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${value}`)}}function htmlValue(value){if(value instanceof HTMLTemplateElement){return value.innerHTML}else if(value instanceof LiteralString){return literalValue(value)}else{throw new Error(`non-template value passed to Polymer's html function: ${value}`)}}const html=function html(strings,...values){const template=document.createElement("template");template.innerHTML=values.reduce((acc,v,idx)=>acc+htmlValue(v)+strings[idx+1],strings[0]);return template},htmlLiteral=function(strings,...values){return new LiteralString(values.reduce((acc,v,idx)=>acc+literalValue(v)+strings[idx+1],strings[0]))};var htmlTag={html:html,htmlLiteral:htmlLiteral};const PolymerElement=ElementMixin(HTMLElement);var polymerElement={version:version,PolymerElement:PolymerElement,html:html};const bundledImportMeta$1={...import.meta,url:new URL("../../define-element.js",import.meta.url).href},_parseTemplateToString=PolymerElement._parseTemplate.toString();function isPolymerClass(proto){return"function"===typeof proto&&"function"===typeof proto._parseTemplate&&proto._parseTemplate.toString()===_parseTemplateToString}function registerPolymerTemplate(proto,id){if(isPolymerClass(proto)){let template=proto.template,baseURI=proto.importMeta?proto.importMeta.url:document.baseURI,_template=DomModule.import(id,"template"),__template,ownerDocument=proto.importMeta&&proto.importMeta.document?proto.importMeta.document:document;template=template||_template;if(!template){let current=null;__template=ownerDocument.querySelector("template[id="+id+"]");if(!__template){__template=ownerDocument.createElement("template");__template.setAttribute("id",id);console.warn("define-element.js: "+id+" has no template. Supplying an empty template")}template=__template}if(!_template){let domModule=document.createElement("dom-module"),assetpath="function"===typeof URL&&"URL"===URL.name?new URL(baseURI).pathname:(uri=>{let a=document.createElement("a");a.href=uri;return("/"+a.pathname).replace(/^\/\//,"/")})(baseURI);domModule.appendChild(template);domModule.setAttribute("assetpath",template.hasAttribute("basepath")?template.getAttribute("basepath"):template.hasAttribute("assetpath")?template.getAttribute("assetpath"):assetpath);domModule.register(id);proto._template=template}}}defineDefineProperty([registerPolymerTemplate]);"use strict";const nativeShadow=!(window.ShadyDOM&&window.ShadyDOM.inUse);let nativeCssVariables_;function calcCssVariables(settings){if(settings&&settings.shimcssproperties){nativeCssVariables_=!1}else{nativeCssVariables_=nativeShadow||!!(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)"))}}let cssBuild;if(window.ShadyCSS&&window.ShadyCSS.cssBuild!==void 0){cssBuild=window.ShadyCSS.cssBuild}if(window.ShadyCSS&&window.ShadyCSS.nativeCss!==void 0){nativeCssVariables_=window.ShadyCSS.nativeCss}else if(window.ShadyCSS){calcCssVariables(window.ShadyCSS);window.ShadyCSS=void 0}else{calcCssVariables(window.WebComponents&&window.WebComponents.flags)}const nativeCssVariables=nativeCssVariables_;var styleSettings={nativeShadow:nativeShadow,get cssBuild(){return cssBuild},nativeCssVariables:nativeCssVariables};"use strict";class StyleNode{constructor(){this.start=0;this.end=0;this.previous=null;this.parent=null;this.rules=null;this.parsedCssText="";this.cssText="";this.atRule=!1;this.type=0;this.keyframesName="";this.selector="";this.parsedSelector=""}}function parse(text){text=clean(text);return parseCss(lex(text),text)}function clean(cssText){return cssText.replace(RX.comments,"").replace(RX.port,"")}function lex(text){let root=new StyleNode;root.start=0;root.end=text.length;let n=root;for(let i=0,l=text.length;i<l;i++){if(text[i]===OPEN_BRACE){if(!n.rules){n.rules=[]}let p=n,previous=p.rules[p.rules.length-1]||null;n=new StyleNode;n.start=i+1;n.parent=p;n.previous=previous;p.rules.push(n)}else if(text[i]===CLOSE_BRACE){n.end=i+1;n=n.parent||root}}return root}function parseCss(node,text){let t=text.substring(node.start,node.end-1);node.parsedCssText=node.cssText=t.trim();if(node.parent){let ss=node.previous?node.previous.end:node.parent.start;t=text.substring(ss,node.start-1);t=_expandUnicodeEscapes(t);t=t.replace(RX.multipleSpaces," ");t=t.substring(t.lastIndexOf(";")+1);let s=node.parsedSelector=node.selector=t.trim();node.atRule=0===s.indexOf(AT_START);if(node.atRule){if(0===s.indexOf(MEDIA_START)){node.type=types.MEDIA_RULE}else if(s.match(RX.keyframesRule)){node.type=types.KEYFRAMES_RULE;node.keyframesName=node.selector.split(RX.multipleSpaces).pop()}}else{if(0===s.indexOf(VAR_START)){node.type=types.MIXIN_RULE}else{node.type=types.STYLE_RULE}}}let r$=node.rules;if(r$){for(let i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){parseCss(r,text)}}return node}function _expandUnicodeEscapes(s){return s.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let code=arguments[1],repeat=6-code.length;while(repeat--){code="0"+code}return"\\"+code})}function stringify(node,preserveProperties,text=""){let cssText="";if(node.cssText||node.rules){let r$=node.rules;if(r$&&!_hasMixinRules(r$)){for(let i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){cssText=stringify(r,preserveProperties,cssText)}}else{cssText=preserveProperties?node.cssText:removeCustomProps(node.cssText);cssText=cssText.trim();if(cssText){cssText="  "+cssText+"\n"}}}if(cssText){if(node.selector){text+=node.selector+" "+OPEN_BRACE+"\n"}text+=cssText;if(node.selector){text+=CLOSE_BRACE+"\n\n"}}return text}function _hasMixinRules(rules){let r=rules[0];return!!r&&!!r.selector&&0===r.selector.indexOf(VAR_START)}function removeCustomProps(cssText){cssText=removeCustomPropAssignment(cssText);return removeCustomPropApply(cssText)}function removeCustomPropAssignment(cssText){return cssText.replace(RX.customProp,"").replace(RX.mixinProp,"")}function removeCustomPropApply(cssText){return cssText.replace(RX.mixinApply,"").replace(RX.varApply,"")}const types={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},OPEN_BRACE="{",CLOSE_BRACE="}",RX={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},VAR_START="--",MEDIA_START="@media",AT_START="@";var cssParse={StyleNode:StyleNode,parse:parse,stringify:stringify,removeCustomPropAssignment:removeCustomPropAssignment,types:types};const VAR_ASSIGN=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,MIXIN_MATCH=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,VAR_CONSUMED=/(--[\w-]+)\s*([:,;)]|$)/gi,ANIMATION_MATCH=/(animation\s*:)|(animation-name\s*:)/,MEDIA_MATCH=/@media\s(.*)/,IS_VAR=/^--/,BRACKETED=/\{[^}]*\}/g,HOST_PREFIX="(?:^|[^.#[:])",HOST_SUFFIX="($|[.:[\\s>+~])";var commonRegex={VAR_ASSIGN:VAR_ASSIGN,MIXIN_MATCH:MIXIN_MATCH,VAR_CONSUMED:VAR_CONSUMED,ANIMATION_MATCH:ANIMATION_MATCH,MEDIA_MATCH:MEDIA_MATCH,IS_VAR:IS_VAR,BRACKETED:BRACKETED,HOST_PREFIX:HOST_PREFIX,HOST_SUFFIX:HOST_SUFFIX};"use strict";const styleTextSet=new Set,scopingAttribute="shady-unscoped";function processUnscopedStyle(style){const text=style.textContent;if(!styleTextSet.has(text)){styleTextSet.add(text);const newStyle=style.cloneNode(!0);document.head.appendChild(newStyle)}}function isUnscopedStyle(style){return style.hasAttribute(scopingAttribute)}var unscopedStyleHandler={scopingAttribute:scopingAttribute,processUnscopedStyle:processUnscopedStyle,isUnscopedStyle:isUnscopedStyle};"use strict";function toCssText(rules,callback){if(!rules){return""}if("string"===typeof rules){rules=parse(rules)}if(callback){forEachRule(rules,callback)}return stringify(rules,nativeCssVariables)}function rulesForStyle(style){if(!style.__cssRules&&style.textContent){style.__cssRules=parse(style.textContent)}return style.__cssRules||null}function isKeyframesSelector(rule){return!!rule.parent&&rule.parent.type===types.KEYFRAMES_RULE}function forEachRule(node,styleRuleCallback,keyframesRuleCallback,onlyActiveRules){if(!node){return}let skipRules=!1,type=node.type;if(onlyActiveRules){if(type===types.MEDIA_RULE){let matchMedia=node.selector.match(MEDIA_MATCH);if(matchMedia){if(!window.matchMedia(matchMedia[1]).matches){skipRules=!0}}}}if(type===types.STYLE_RULE){styleRuleCallback(node)}else if(keyframesRuleCallback&&type===types.KEYFRAMES_RULE){keyframesRuleCallback(node)}else if(type===types.MIXIN_RULE){skipRules=!0}let r$=node.rules;if(r$&&!skipRules){for(let i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){forEachRule(r,styleRuleCallback,keyframesRuleCallback,onlyActiveRules)}}}function applyCss(cssText,moniker,target,contextNode){let style=createScopeStyle(cssText,moniker);applyStyle(style,target,contextNode);return style}function createScopeStyle(cssText,moniker){let style=document.createElement("style");if(moniker){style.setAttribute("scope",moniker)}style.textContent=cssText;return style}let lastHeadApplyNode=null;function applyStylePlaceHolder(moniker){let placeHolder=document.createComment(" Shady DOM styles for "+moniker+" "),after=lastHeadApplyNode?lastHeadApplyNode.nextSibling:null,scope=document.head;scope.insertBefore(placeHolder,after||scope.firstChild);lastHeadApplyNode=placeHolder;return placeHolder}function applyStyle(style,target,contextNode){target=target||document.head;let after=contextNode&&contextNode.nextSibling||target.firstChild;target.insertBefore(style,after);if(!lastHeadApplyNode){lastHeadApplyNode=style}else{let position=style.compareDocumentPosition(lastHeadApplyNode);if(position===Node.DOCUMENT_POSITION_PRECEDING){lastHeadApplyNode=style}}}function isTargetedBuild(buildType){return nativeShadow?"shadow"===buildType:"shady"===buildType}function findMatchingParen(text,start){let level=0;for(let i=start,l=text.length;i<l;i++){if("("===text[i]){level++}else if(")"===text[i]){if(0===--level){return i}}}return-1}function processVariableAndFallback(str,callback){let start=str.indexOf("var(");if(-1===start){return callback(str,"","","")}let end=findMatchingParen(str,start+3),inner=str.substring(start+4,end),prefix=str.substring(0,start),suffix=processVariableAndFallback(str.substring(end+1),callback),comma=inner.indexOf(",");if(-1===comma){return callback(prefix,inner.trim(),"",suffix)}let value=inner.substring(0,comma).trim(),fallback=inner.substring(comma+1).trim();return callback(prefix,value,fallback,suffix)}function setElementClassRaw(element,value){if(nativeShadow){element.setAttribute("class",value)}else{window.ShadyDOM.nativeMethods.setAttribute.call(element,"class",value)}}const wrap=window.ShadyDOM&&window.ShadyDOM.wrap||(node=>node);function getIsExtends(element){let localName=element.localName,is="",typeExtension="";if(localName){if(-1<localName.indexOf("-")){is=localName}else{typeExtension=localName;is=element.getAttribute&&element.getAttribute("is")||""}}else{is=element.is;typeExtension=element.extends}return{is,typeExtension}}function gatherStyleText(element){const styleTextParts=[],styles=element.querySelectorAll("style");for(let i=0;i<styles.length;i++){const style=styles[i];if(isUnscopedStyle(style)){if(!nativeShadow){processUnscopedStyle(style);style.parentNode.removeChild(style)}}else{styleTextParts.push(style.textContent);style.parentNode.removeChild(style)}}return styleTextParts.join("").trim()}function splitSelectorList(selector){const parts=[];let part="";for(let i=0;0<=i&&i<selector.length;i++){if("("===selector[i]){const end=findMatchingParen(selector,i);part+=selector.slice(i,end+1);i=end}else if(","===selector[i]){parts.push(part);part=""}else{part+=selector[i]}}if(part){parts.push(part)}return parts}const CSS_BUILD_ATTR="css-build";function getCssBuild(element){if(cssBuild!==void 0){return cssBuild}if(element.__cssBuild===void 0){const attrValue=element.getAttribute(CSS_BUILD_ATTR);if(attrValue){element.__cssBuild=attrValue}else{const buildComment=getBuildComment(element);if(""!==buildComment){removeBuildComment(element)}element.__cssBuild=buildComment}}return element.__cssBuild||""}function elementHasBuiltCss(element){return""!==getCssBuild(element)}function getBuildComment(element){const buildComment="template"===element.localName?element.content.firstChild:element.firstChild;if(buildComment instanceof Comment){const commentParts=buildComment.textContent.trim().split(":");if(commentParts[0]===CSS_BUILD_ATTR){return commentParts[1]}}return""}function isOptimalCssBuild(cssBuild$$1=""){if(""===cssBuild$$1||!nativeCssVariables){return!1}return nativeShadow?"shadow"===cssBuild$$1:"shady"===cssBuild$$1}function removeBuildComment(element){const buildComment="template"===element.localName?element.content.firstChild:element.firstChild;buildComment.parentNode.removeChild(buildComment)}var styleUtil={toCssText:toCssText,rulesForStyle:rulesForStyle,isKeyframesSelector:isKeyframesSelector,forEachRule:forEachRule,applyCss:applyCss,createScopeStyle:createScopeStyle,applyStylePlaceHolder:applyStylePlaceHolder,applyStyle:applyStyle,isTargetedBuild:isTargetedBuild,findMatchingParen:findMatchingParen,processVariableAndFallback:processVariableAndFallback,setElementClassRaw:setElementClassRaw,wrap:wrap,getIsExtends:getIsExtends,gatherStyleText:gatherStyleText,splitSelectorList:splitSelectorList,getCssBuild:getCssBuild,elementHasBuiltCss:elementHasBuiltCss,getBuildComment:getBuildComment,isOptimalCssBuild:isOptimalCssBuild};"use strict";function updateNativeProperties(element,properties){for(let p in properties){if(null===p){element.style.removeProperty(p)}else{element.style.setProperty(p,properties[p])}}}function getComputedStyleValue(element,property){const value=window.getComputedStyle(element).getPropertyValue(property);if(!value){return""}else{return value.trim()}}function detectMixin(cssText){const has=MIXIN_MATCH.test(cssText)||VAR_ASSIGN.test(cssText);MIXIN_MATCH.lastIndex=0;VAR_ASSIGN.lastIndex=0;return has}var commonUtils={updateNativeProperties:updateNativeProperties,getComputedStyleValue:getComputedStyleValue,detectMixin:detectMixin};"use strict";const APPLY_NAME_CLEAN=/;\s*/m,INITIAL_INHERIT=/^\s*(initial)|(inherit)\s*$/,IMPORTANT=/\s*!important/,MIXIN_VAR_SEP="_-_";let PropertyEntry,DependantsEntry,MixinMapEntry;class MixinMap{constructor(){this._map={}}set(name,props){name=name.trim();this._map[name]={properties:props,dependants:{}}}get(name){name=name.trim();return this._map[name]||null}}let invalidCallback=null;class ApplyShim{constructor(){this._currentElement=null;this._measureElement=null;this._map=new MixinMap}detectMixin(cssText){return detectMixin(cssText)}gatherStyles(template){const styleText=gatherStyleText(template.content);if(styleText){const style=document.createElement("style");style.textContent=styleText;template.content.insertBefore(style,template.content.firstChild);return style}return null}transformTemplate(template,elementName){if(template._gatheredStyle===void 0){template._gatheredStyle=this.gatherStyles(template)}const style=template._gatheredStyle;return style?this.transformStyle(style,elementName):null}transformStyle(style,elementName=""){let ast=rulesForStyle(style);this.transformRules(ast,elementName);style.textContent=toCssText(ast);return ast}transformCustomStyle(style){let ast=rulesForStyle(style);forEachRule(ast,rule=>{if(":root"===rule.selector){rule.selector="html"}this.transformRule(rule)});style.textContent=toCssText(ast);return ast}transformRules(rules,elementName){this._currentElement=elementName;forEachRule(rules,r=>{this.transformRule(r)});this._currentElement=null}transformRule(rule){rule.cssText=this.transformCssText(rule.parsedCssText,rule);if(":root"===rule.selector){rule.selector=":host > *"}}transformCssText(cssText,rule){cssText=cssText.replace(VAR_ASSIGN,(matchText,propertyName,valueProperty,valueMixin)=>this._produceCssProperties(matchText,propertyName,valueProperty,valueMixin,rule));return this._consumeCssProperties(cssText,rule)}_getInitialValueForProperty(property){if(!this._measureElement){this._measureElement=document.createElement("meta");this._measureElement.setAttribute("apply-shim-measure","");this._measureElement.style.all="initial";document.head.appendChild(this._measureElement)}return window.getComputedStyle(this._measureElement).getPropertyValue(property)}_fallbacksFromPreviousRules(startRule){let topRule=startRule;while(topRule.parent){topRule=topRule.parent}const fallbacks={};let seenStartRule=!1;forEachRule(topRule,r=>{seenStartRule=seenStartRule||r===startRule;if(seenStartRule){return}if(r.selector===startRule.selector){Object.assign(fallbacks,this._cssTextToMap(r.parsedCssText))}});return fallbacks}_consumeCssProperties(text,rule){let m=null;while(m=MIXIN_MATCH.exec(text)){let matchText=m[0],mixinName=m[1],idx=m.index,applyPos=idx+matchText.indexOf("@apply"),afterApplyPos=idx+matchText.length,textBeforeApply=text.slice(0,applyPos),textAfterApply=text.slice(afterApplyPos),defaults=rule?this._fallbacksFromPreviousRules(rule):{};Object.assign(defaults,this._cssTextToMap(textBeforeApply));let replacement=this._atApplyToCssProperties(mixinName,defaults);text=`${textBeforeApply}${replacement}${textAfterApply}`;MIXIN_MATCH.lastIndex=idx+replacement.length}return text}_atApplyToCssProperties(mixinName,fallbacks){mixinName=mixinName.replace(APPLY_NAME_CLEAN,"");let vars=[],mixinEntry=this._map.get(mixinName);if(!mixinEntry){this._map.set(mixinName,{});mixinEntry=this._map.get(mixinName)}if(mixinEntry){if(this._currentElement){mixinEntry.dependants[this._currentElement]=!0}let p,parts,f;const properties=mixinEntry.properties;for(p in properties){f=fallbacks&&fallbacks[p];parts=[p,": var(",mixinName,MIXIN_VAR_SEP,p];if(f){parts.push(",",f.replace(IMPORTANT,""))}parts.push(")");if(IMPORTANT.test(properties[p])){parts.push(" !important")}vars.push(parts.join(""))}}return vars.join("; ")}_replaceInitialOrInherit(property,value){let match=INITIAL_INHERIT.exec(value);if(match){if(match[1]){value=this._getInitialValueForProperty(property)}else{value="apply-shim-inherit"}}return value}_cssTextToMap(text,replaceInitialOrInherit=!1){let props=text.split(";"),property,value,out={};for(let i=0,p,sp;i<props.length;i++){p=props[i];if(p){sp=p.split(":");if(1<sp.length){property=sp[0].trim();value=sp.slice(1).join(":");if(replaceInitialOrInherit){value=this._replaceInitialOrInherit(property,value)}out[property]=value}}}return out}_invalidateMixinEntry(mixinEntry){if(!invalidCallback){return}for(let elementName in mixinEntry.dependants){if(elementName!==this._currentElement){invalidCallback(elementName)}}}_produceCssProperties(matchText,propertyName,valueProperty,valueMixin,rule){if(valueProperty){processVariableAndFallback(valueProperty,(prefix,value)=>{if(value&&this._map.get(value)){valueMixin=`@apply ${value};`}})}if(!valueMixin){return matchText}let mixinAsProperties=this._consumeCssProperties(""+valueMixin,rule),prefix=matchText.slice(0,matchText.indexOf("--")),mixinValues=this._cssTextToMap(mixinAsProperties,!0),combinedProps=mixinValues,mixinEntry=this._map.get(propertyName),oldProps=mixinEntry&&mixinEntry.properties;if(oldProps){combinedProps=Object.assign(Object.create(oldProps),mixinValues)}else{this._map.set(propertyName,combinedProps)}let out=[],p,v,needToInvalidate=!1;for(p in combinedProps){v=mixinValues[p];if(v===void 0){v="initial"}if(oldProps&&!(p in oldProps)){needToInvalidate=!0}out.push(`${propertyName}${MIXIN_VAR_SEP}${p}: ${v}`)}if(needToInvalidate){this._invalidateMixinEntry(mixinEntry)}if(mixinEntry){mixinEntry.properties=combinedProps}if(valueProperty){prefix=`${matchText};${prefix}`}return`${prefix}${out.join("; ")};`}}ApplyShim.prototype.detectMixin=ApplyShim.prototype.detectMixin;ApplyShim.prototype.transformStyle=ApplyShim.prototype.transformStyle;ApplyShim.prototype.transformCustomStyle=ApplyShim.prototype.transformCustomStyle;ApplyShim.prototype.transformRules=ApplyShim.prototype.transformRules;ApplyShim.prototype.transformRule=ApplyShim.prototype.transformRule;ApplyShim.prototype.transformTemplate=ApplyShim.prototype.transformTemplate;ApplyShim.prototype._separator=MIXIN_VAR_SEP;Object.defineProperty(ApplyShim.prototype,"invalidCallback",{get(){return invalidCallback},set(cb){invalidCallback=cb}});var applyShim={default:ApplyShim};"use strict";const templateMap={};var templateMap$1={default:templateMap};"use strict";const CURRENT_VERSION="_applyShimCurrentVersion",NEXT_VERSION="_applyShimNextVersion",VALIDATING_VERSION="_applyShimValidatingVersion",promise=Promise.resolve();function invalidate(elementName){let template=templateMap[elementName];if(template){invalidateTemplate(template)}}function invalidateTemplate(template){template[CURRENT_VERSION]=template[CURRENT_VERSION]||0;template[VALIDATING_VERSION]=template[VALIDATING_VERSION]||0;template[NEXT_VERSION]=(template[NEXT_VERSION]||0)+1}function isValid(elementName){let template=templateMap[elementName];if(template){return templateIsValid(template)}return!0}function templateIsValid(template){return template[CURRENT_VERSION]===template[NEXT_VERSION]}function isValidating(elementName){let template=templateMap[elementName];if(template){return templateIsValidating(template)}return!1}function templateIsValidating(template){return!templateIsValid(template)&&template[VALIDATING_VERSION]===template[NEXT_VERSION]}function startValidating(elementName){let template=templateMap[elementName];startValidatingTemplate(template)}function startValidatingTemplate(template){template[VALIDATING_VERSION]=template[NEXT_VERSION];if(!template._validating){template._validating=!0;promise.then(function(){template[CURRENT_VERSION]=template[NEXT_VERSION];template._validating=!1})}}function elementsAreInvalid(){for(let elementName in templateMap){let template=templateMap[elementName];if(!templateIsValid(template)){return!0}}return!1}var applyShimUtils={invalidate:invalidate,invalidateTemplate:invalidateTemplate,isValid:isValid,templateIsValid:templateIsValid,isValidating:isValidating,templateIsValidating:templateIsValidating,startValidating:startValidating,startValidatingTemplate:startValidatingTemplate,elementsAreInvalid:elementsAreInvalid};"use strict";let readyPromise=null,whenReady=window.HTMLImports&&window.HTMLImports.whenReady||null,resolveFn;function documentWait(callback){requestAnimationFrame(function(){if(whenReady){whenReady(callback)}else{if(!readyPromise){readyPromise=new Promise(resolve=>{resolveFn=resolve});if("complete"===document.readyState){resolveFn()}else{document.addEventListener("readystatechange",()=>{if("complete"===document.readyState){resolveFn()}})}}readyPromise.then(function(){callback&&callback()})}})}var documentWait$1={default:documentWait};"use strict";let CustomStyleProvider;const SEEN_MARKER="__seenByShadyCSS",CACHED_STYLE="__shadyCSSCachedStyle";let transformFn=null,validateFn=null;class CustomStyleInterface{constructor(){this.customStyles=[];this.enqueued=!1;documentWait(()=>{if(window.ShadyCSS.flushCustomStyles){window.ShadyCSS.flushCustomStyles()}})}enqueueDocumentValidation(){if(this.enqueued||!validateFn){return}this.enqueued=!0;documentWait(validateFn)}addCustomStyle(style){if(!style[SEEN_MARKER]){style[SEEN_MARKER]=!0;this.customStyles.push(style);this.enqueueDocumentValidation()}}getStyleForCustomStyle(customStyle){if(customStyle[CACHED_STYLE]){return customStyle[CACHED_STYLE]}let style;if(customStyle.getStyle){style=customStyle.getStyle()}else{style=customStyle}return style}processStyles(){const cs=this.customStyles;for(let i=0;i<cs.length;i++){const customStyle=cs[i];if(customStyle[CACHED_STYLE]){continue}const style=this.getStyleForCustomStyle(customStyle);if(style){const styleToTransform=style.__appliedElement||style;if(transformFn){transformFn(styleToTransform)}customStyle[CACHED_STYLE]=styleToTransform}}return cs}}CustomStyleInterface.prototype.addCustomStyle=CustomStyleInterface.prototype.addCustomStyle;CustomStyleInterface.prototype.getStyleForCustomStyle=CustomStyleInterface.prototype.getStyleForCustomStyle;CustomStyleInterface.prototype.processStyles=CustomStyleInterface.prototype.processStyles;Object.defineProperties(CustomStyleInterface.prototype,{transformCallback:{get(){return transformFn},set(fn){transformFn=fn}},validateCallback:{get(){return validateFn},set(fn){let needsEnqueue=!1;if(!validateFn){needsEnqueue=!0}validateFn=fn;if(needsEnqueue){this.enqueueDocumentValidation()}}}});const CustomStyleInterfaceInterface={};var customStyleInterface={CustomStyleProvider:CustomStyleProvider,default:CustomStyleInterface,CustomStyleInterfaceInterface:CustomStyleInterfaceInterface};"use strict";const applyShim$1=new ApplyShim;class ApplyShimInterface{constructor(){this.customStyleInterface=null;applyShim$1.invalidCallback=invalidate}ensure(){if(this.customStyleInterface){return}if(window.ShadyCSS.CustomStyleInterface){this.customStyleInterface=window.ShadyCSS.CustomStyleInterface;this.customStyleInterface.transformCallback=style=>{applyShim$1.transformCustomStyle(style)};this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{if(this.customStyleInterface.enqueued){this.flushCustomStyles()}})}}}prepareTemplate(template,elementName){this.ensure();if(elementHasBuiltCss(template)){return}templateMap[elementName]=template;let ast=applyShim$1.transformTemplate(template,elementName);template._styleAst=ast}flushCustomStyles(){this.ensure();if(!this.customStyleInterface){return}let styles=this.customStyleInterface.processStyles();if(!this.customStyleInterface.enqueued){return}for(let i=0;i<styles.length;i++){let cs=styles[i],style=this.customStyleInterface.getStyleForCustomStyle(cs);if(style){applyShim$1.transformCustomStyle(style)}}this.customStyleInterface.enqueued=!1}styleSubtree(element,properties){this.ensure();if(properties){updateNativeProperties(element,properties)}if(element.shadowRoot){this.styleElement(element);let shadowChildren=element.shadowRoot.children||element.shadowRoot.childNodes;for(let i=0;i<shadowChildren.length;i++){this.styleSubtree(shadowChildren[i])}}else{let children=element.children||element.childNodes;for(let i=0;i<children.length;i++){this.styleSubtree(children[i])}}}styleElement(element){this.ensure();let{is}=getIsExtends(element),template=templateMap[is];if(template&&elementHasBuiltCss(template)){return}if(template&&!templateIsValid(template)){if(!templateIsValidating(template)){this.prepareTemplate(template,is);startValidatingTemplate(template)}let root=element.shadowRoot;if(root){let style=root.querySelector("style");if(style){style.__cssRules=template._styleAst;style.textContent=toCssText(template._styleAst)}}}}styleDocument(properties){this.ensure();this.styleSubtree(document.body,properties)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const applyShimInterface=new ApplyShimInterface;let CustomStyleInterface$$1=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(template,elementName,elementExtends){applyShimInterface.flushCustomStyles();applyShimInterface.prepareTemplate(template,elementName)},prepareTemplateStyles(template,elementName,elementExtends){window.ShadyCSS.prepareTemplate(template,elementName,elementExtends)},prepareTemplateDom(template,elementName){},styleSubtree(element,properties){applyShimInterface.flushCustomStyles();applyShimInterface.styleSubtree(element,properties)},styleElement(element){applyShimInterface.flushCustomStyles();applyShimInterface.styleElement(element)},styleDocument(properties){applyShimInterface.flushCustomStyles();applyShimInterface.styleDocument(properties)},getComputedStyleValue(element,property){return getComputedStyleValue(element,property)},flushCustomStyles(){applyShimInterface.flushCustomStyles()},nativeCss:nativeCssVariables,nativeShadow:nativeShadow,cssBuild:cssBuild};if(CustomStyleInterface$$1){window.ShadyCSS.CustomStyleInterface=CustomStyleInterface$$1}}window.ShadyCSS.ApplyShim=applyShim$1;class Debouncer{constructor(){this._asyncModule=null;this._callback=null;this._timer=null}setConfig(asyncModule,callback){this._asyncModule=asyncModule;this._callback=callback;this._timer=this._asyncModule.run(()=>{this._timer=null;this._callback()})}cancel(){if(this.isActive()){this._asyncModule.cancel(this._timer);this._timer=null}}flush(){if(this.isActive()){this.cancel();this._callback()}}isActive(){return null!=this._timer}static debounce(debouncer,asyncModule,callback){if(debouncer instanceof Debouncer){debouncer.cancel()}else{debouncer=new Debouncer}debouncer.setConfig(asyncModule,callback);return debouncer}}var debounce={Debouncer:Debouncer};let HAS_NATIVE_TA="string"===typeof document.head.style.touchAction,GESTURE_KEY="__polymerGestures",HANDLED_OBJ="__polymerGesturesHandled",TOUCH_ACTION="__polymerGesturesTouchAction",TAP_DISTANCE=25,TRACK_DISTANCE=5,TRACK_LENGTH=2,MOUSE_TIMEOUT=2500,MOUSE_EVENTS=["mousedown","mousemove","mouseup","click"],MOUSE_WHICH_TO_BUTTONS=[0,1,4,2],MOUSE_HAS_BUTTONS=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function isMouseEvent(name){return-1<MOUSE_EVENTS.indexOf(name)}let SUPPORTS_PASSIVE=!1;(function(){try{let opts=Object.defineProperty({},"passive",{get(){SUPPORTS_PASSIVE=!0}});window.addEventListener("test",null,opts);window.removeEventListener("test",null,opts)}catch(e){}})();function PASSIVE_TOUCH(eventName){if(isMouseEvent(eventName)||"touchend"===eventName){return}if(HAS_NATIVE_TA&&SUPPORTS_PASSIVE&&passiveTouchGestures){return{passive:!0}}else{return}}let IS_TOUCH_ONLY=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const clickedLabels=[],labellable={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},canBeDisabled={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function canBeLabelled(el){return labellable[el.localName]||!1}function matchingLabels(el){let labels=Array.prototype.slice.call(el.labels||[]);if(!labels.length){labels=[];let root=el.getRootNode();if(el.id){let matching=root.querySelectorAll(`label[for = ${el.id}]`);for(let i=0;i<matching.length;i++){labels.push(matching[i])}}}return labels}let mouseCanceller=function(mouseEvent){let sc=mouseEvent.sourceCapabilities;if(sc&&!sc.firesTouchEvents){return}mouseEvent[HANDLED_OBJ]={skip:!0};if("click"===mouseEvent.type){let clickFromLabel=!1,path=mouseEvent.composedPath&&mouseEvent.composedPath();if(path){for(let i=0;i<path.length;i++){if(path[i].nodeType===Node.ELEMENT_NODE){if("label"===path[i].localName){clickedLabels.push(path[i])}else if(canBeLabelled(path[i])){let ownerLabels=matchingLabels(path[i]);for(let j=0;j<ownerLabels.length;j++){clickFromLabel=clickFromLabel||-1<clickedLabels.indexOf(ownerLabels[j])}}}if(path[i]===POINTERSTATE.mouse.target){return}}}if(clickFromLabel){return}mouseEvent.preventDefault();mouseEvent.stopPropagation()}};function setupTeardownMouseCanceller(setup){let events=IS_TOUCH_ONLY?["click"]:MOUSE_EVENTS;for(let i=0,en;i<events.length;i++){en=events[i];if(setup){clickedLabels.length=0;document.addEventListener(en,mouseCanceller,!0)}else{document.removeEventListener(en,mouseCanceller,!0)}}}function ignoreMouse(e){if(!POINTERSTATE.mouse.mouseIgnoreJob){setupTeardownMouseCanceller(!0)}let unset=function(){setupTeardownMouseCanceller();POINTERSTATE.mouse.target=null;POINTERSTATE.mouse.mouseIgnoreJob=null};POINTERSTATE.mouse.target=e.composedPath()[0];POINTERSTATE.mouse.mouseIgnoreJob=Debouncer.debounce(POINTERSTATE.mouse.mouseIgnoreJob,timeOut.after(MOUSE_TIMEOUT),unset)}function hasLeftMouseButton(ev){let type=ev.type;if(!isMouseEvent(type)){return!1}if("mousemove"===type){let buttons=ev.buttons===void 0?1:ev.buttons;if(ev instanceof window.MouseEvent&&!MOUSE_HAS_BUTTONS){buttons=MOUSE_WHICH_TO_BUTTONS[ev.which]||0}return!!(1&buttons)}else{let button=ev.button===void 0?0:ev.button;return 0===button}}function isSyntheticClick(ev){if("click"===ev.type){if(0===ev.detail){return!0}let t=_findOriginalTarget(ev);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE){return!0}let bcr=t.getBoundingClientRect(),x=ev.pageX,y=ev.pageY;return!(x>=bcr.left&&x<=bcr.right&&y>=bcr.top&&y<=bcr.bottom)}return!1}let POINTERSTATE={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function firstTouchAction(ev){let ta="auto",path=ev.composedPath&&ev.composedPath();if(path){for(let i=0,n;i<path.length;i++){n=path[i];if(n[TOUCH_ACTION]){ta=n[TOUCH_ACTION];break}}}return ta}function trackDocument(stateObj,movefn,upfn){stateObj.movefn=movefn;stateObj.upfn=upfn;document.addEventListener("mousemove",movefn);document.addEventListener("mouseup",upfn)}function untrackDocument(stateObj){document.removeEventListener("mousemove",stateObj.movefn);document.removeEventListener("mouseup",stateObj.upfn);stateObj.movefn=null;stateObj.upfn=null}document.addEventListener("touchend",ignoreMouse,SUPPORTS_PASSIVE?{passive:!0}:!1);const gestures={},recognizers=[];function deepTargetFind(x,y){let node=document.elementFromPoint(x,y),next=node;while(next&&next.shadowRoot&&!window.ShadyDOM){let oldNext=next;next=next.shadowRoot.elementFromPoint(x,y);if(oldNext===next){break}if(next){node=next}}return node}function _findOriginalTarget(ev){if(ev.composedPath){const targets=ev.composedPath();return 0<targets.length?targets[0]:ev.target}return ev.target}function _handleNative(ev){let handled,type=ev.type,node=ev.currentTarget,gobj=node[GESTURE_KEY];if(!gobj){return}let gs=gobj[type];if(!gs){return}if(!ev[HANDLED_OBJ]){ev[HANDLED_OBJ]={};if("touch"===type.slice(0,5)){ev=ev;let t=ev.changedTouches[0];if("touchstart"===type){if(1===ev.touches.length){POINTERSTATE.touch.id=t.identifier}}if(POINTERSTATE.touch.id!==t.identifier){return}if(!HAS_NATIVE_TA){if("touchstart"===type||"touchmove"===type){_handleTouchAction(ev)}}}}handled=ev[HANDLED_OBJ];if(handled.skip){return}for(let i=0,r;i<recognizers.length;i++){r=recognizers[i];if(gs[r.name]&&!handled[r.name]){if(r.flow&&-1<r.flow.start.indexOf(ev.type)&&r.reset){r.reset()}}}for(let i=0,r;i<recognizers.length;i++){r=recognizers[i];if(gs[r.name]&&!handled[r.name]){handled[r.name]=!0;r[type](ev)}}}function _handleTouchAction(ev){var _Mathabs=Math.abs;let t=ev.changedTouches[0],type=ev.type;if("touchstart"===type){POINTERSTATE.touch.x=t.clientX;POINTERSTATE.touch.y=t.clientY;POINTERSTATE.touch.scrollDecided=!1}else if("touchmove"===type){if(POINTERSTATE.touch.scrollDecided){return}POINTERSTATE.touch.scrollDecided=!0;let ta=firstTouchAction(ev),shouldPrevent=!1,dx=_Mathabs(POINTERSTATE.touch.x-t.clientX),dy=_Mathabs(POINTERSTATE.touch.y-t.clientY);if(!ev.cancelable){}else if("none"===ta){shouldPrevent=!0}else if("pan-x"===ta){shouldPrevent=dy>dx}else if("pan-y"===ta){shouldPrevent=dx>dy}if(shouldPrevent){ev.preventDefault()}else{prevent("track")}}}function addListener(node,evType,handler){if(gestures[evType]){_add(node,evType,handler);return!0}return!1}function removeListener(node,evType,handler){if(gestures[evType]){_remove(node,evType,handler);return!0}return!1}function _add(node,evType,handler){let recognizer=gestures[evType],deps=recognizer.deps,name=recognizer.name,gobj=node[GESTURE_KEY];if(!gobj){node[GESTURE_KEY]=gobj={}}for(let i=0,dep,gd;i<deps.length;i++){dep=deps[i];if(IS_TOUCH_ONLY&&isMouseEvent(dep)&&"click"!==dep){continue}gd=gobj[dep];if(!gd){gobj[dep]=gd={_count:0}}if(0===gd._count){node.addEventListener(dep,_handleNative,PASSIVE_TOUCH(dep))}gd[name]=(gd[name]||0)+1;gd._count=(gd._count||0)+1}node.addEventListener(evType,handler);if(recognizer.touchAction){setTouchAction(node,recognizer.touchAction)}}function _remove(node,evType,handler){let recognizer=gestures[evType],deps=recognizer.deps,name=recognizer.name,gobj=node[GESTURE_KEY];if(gobj){for(let i=0,dep,gd;i<deps.length;i++){dep=deps[i];gd=gobj[dep];if(gd&&gd[name]){gd[name]=(gd[name]||1)-1;gd._count=(gd._count||1)-1;if(0===gd._count){node.removeEventListener(dep,_handleNative,PASSIVE_TOUCH(dep))}}}}node.removeEventListener(evType,handler)}function register$1(recog){recognizers.push(recog);for(let i=0;i<recog.emits.length;i++){gestures[recog.emits[i]]=recog}}function _findRecognizerByEvent(evName){for(let i=0,r;i<recognizers.length;i++){r=recognizers[i];for(let j=0,n;j<r.emits.length;j++){n=r.emits[j];if(n===evName){return r}}}return null}function setTouchAction(node,value){if(HAS_NATIVE_TA&&node instanceof HTMLElement){microTask.run(()=>{node.style.touchAction=value})}node[TOUCH_ACTION]=value}function _fire(target,type,detail){let ev=new Event(type,{bubbles:!0,cancelable:!0,composed:!0});ev.detail=detail;target.dispatchEvent(ev);if(ev.defaultPrevented){let preventer=detail.preventer||detail.sourceEvent;if(preventer&&preventer.preventDefault){preventer.preventDefault()}}}function prevent(evName){let recognizer=_findRecognizerByEvent(evName);if(recognizer.info){recognizer.info.prevent=!0}}function resetMouseCanceller(){if(POINTERSTATE.mouse.mouseIgnoreJob){POINTERSTATE.mouse.mouseIgnoreJob.flush()}}register$1({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){untrackDocument(this.info)},mousedown:function(e){if(!hasLeftMouseButton(e)){return}let t=_findOriginalTarget(e),self=this,movefn=function movefn(e){if(!hasLeftMouseButton(e)){downupFire("up",t,e);untrackDocument(self.info)}},upfn=function upfn(e){if(hasLeftMouseButton(e)){downupFire("up",t,e)}untrackDocument(self.info)};trackDocument(this.info,movefn,upfn);downupFire("down",t,e)},touchstart:function(e){downupFire("down",_findOriginalTarget(e),e.changedTouches[0],e)},touchend:function(e){downupFire("up",_findOriginalTarget(e),e.changedTouches[0],e)}});function downupFire(type,target,event,preventer){if(!target){return}_fire(target,type,{x:event.clientX,y:event.clientY,sourceEvent:event,preventer:preventer,prevent:function(e){return prevent(e)}})}register$1({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(move){if(this.moves.length>TRACK_LENGTH){this.moves.shift()}this.moves.push(move)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start";this.info.started=!1;this.info.moves=[];this.info.x=0;this.info.y=0;this.info.prevent=!1;untrackDocument(this.info)},mousedown:function(e){if(!hasLeftMouseButton(e)){return}let t=_findOriginalTarget(e),self=this,movefn=function movefn(e){let x=e.clientX,y=e.clientY;if(trackHasMovedEnough(self.info,x,y)){self.info.state=self.info.started?"mouseup"===e.type?"end":"track":"start";if("start"===self.info.state){prevent("tap")}self.info.addMove({x:x,y:y});if(!hasLeftMouseButton(e)){self.info.state="end";untrackDocument(self.info)}if(t){trackFire(self.info,t,e)}self.info.started=!0}},upfn=function upfn(e){if(self.info.started){movefn(e)}untrackDocument(self.info)};trackDocument(this.info,movefn,upfn);this.info.x=e.clientX;this.info.y=e.clientY},touchstart:function(e){let ct=e.changedTouches[0];this.info.x=ct.clientX;this.info.y=ct.clientY},touchmove:function(e){let t=_findOriginalTarget(e),ct=e.changedTouches[0],x=ct.clientX,y=ct.clientY;if(trackHasMovedEnough(this.info,x,y)){if("start"===this.info.state){prevent("tap")}this.info.addMove({x:x,y:y});trackFire(this.info,t,ct);this.info.state="track";this.info.started=!0}},touchend:function(e){let t=_findOriginalTarget(e),ct=e.changedTouches[0];if(this.info.started){this.info.state="end";this.info.addMove({x:ct.clientX,y:ct.clientY});trackFire(this.info,t,ct)}}});function trackHasMovedEnough(info,x,y){var _Mathabs2=Math.abs;if(info.prevent){return!1}if(info.started){return!0}let dx=_Mathabs2(info.x-x),dy=_Mathabs2(info.y-y);return dx>=TRACK_DISTANCE||dy>=TRACK_DISTANCE}function trackFire(info,target,touch){if(!target){return}let secondlast=info.moves[info.moves.length-2],lastmove=info.moves[info.moves.length-1],dx=lastmove.x-info.x,dy=lastmove.y-info.y,ddx,ddy=0;if(secondlast){ddx=lastmove.x-secondlast.x;ddy=lastmove.y-secondlast.y}_fire(target,"track",{state:info.state,x:touch.clientX,y:touch.clientY,dx:dx,dy:dy,ddx:ddx,ddy:ddy,sourceEvent:touch,hover:function(){return deepTargetFind(touch.clientX,touch.clientY)}})}register$1({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN;this.info.y=NaN;this.info.prevent=!1},mousedown:function(e){if(hasLeftMouseButton(e)){this.info.x=e.clientX;this.info.y=e.clientY}},click:function(e){if(hasLeftMouseButton(e)){trackForward(this.info,e)}},touchstart:function(e){const touch=e.changedTouches[0];this.info.x=touch.clientX;this.info.y=touch.clientY},touchend:function(e){trackForward(this.info,e.changedTouches[0],e)}});function trackForward(info,e,preventer){var _Mathabs3=Math.abs;let dx=_Mathabs3(e.clientX-info.x),dy=_Mathabs3(e.clientY-info.y),t=_findOriginalTarget(preventer||e);if(!t||canBeDisabled[t.localName]&&t.hasAttribute("disabled")){return}if(isNaN(dx)||isNaN(dy)||dx<=TAP_DISTANCE&&dy<=TAP_DISTANCE||isSyntheticClick(e)){if(!info.prevent){_fire(t,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:preventer})}}}const findOriginalTarget=_findOriginalTarget,add=addListener,remove=removeListener;var gestures$1={gestures:gestures,recognizers:recognizers,deepTargetFind:deepTargetFind,addListener:addListener,removeListener:removeListener,register:register$1,setTouchAction:setTouchAction,prevent:prevent,resetMouseCanceller:resetMouseCanceller,findOriginalTarget:findOriginalTarget,add:add,remove:remove};const GestureEventListeners=dedupingMixin(superClass=>{class GestureEventListeners extends superClass{_addEventListenerToNode(node,eventName,handler){if(!addListener(node,eventName,handler)){super._addEventListenerToNode(node,eventName,handler)}}_removeEventListenerFromNode(node,eventName,handler){if(!removeListener(node,eventName,handler)){super._removeEventListenerFromNode(node,eventName,handler)}}}return GestureEventListeners});var gestureEventListeners={GestureEventListeners:GestureEventListeners};const HOST_DIR=/:host\(:dir\((ltr|rtl)\)\)/g,HOST_DIR_REPLACMENT=":host([dir=\"$1\"])",EL_DIR=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,EL_DIR_REPLACMENT=":host([dir=\"$2\"]) $1",DIR_INSTANCES=[];let observer=null,DOCUMENT_DIR="";function getRTL(){DOCUMENT_DIR=document.documentElement.getAttribute("dir")}function setRTL(instance){if(!instance.__autoDirOptOut){const el=instance;el.setAttribute("dir",DOCUMENT_DIR)}}function updateDirection(){getRTL();DOCUMENT_DIR=document.documentElement.getAttribute("dir");for(let i=0;i<DIR_INSTANCES.length;i++){setRTL(DIR_INSTANCES[i])}}function takeRecords(){if(observer&&observer.takeRecords().length){updateDirection()}}const DirMixin=dedupingMixin(base=>{if(!observer){getRTL();observer=new MutationObserver(updateDirection);observer.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]})}const elementBase=PropertyAccessors(base);class Dir extends elementBase{static _processStyleText(cssText,baseURI){cssText=super._processStyleText(cssText,baseURI);cssText=this._replaceDirInCssText(cssText);return cssText}static _replaceDirInCssText(text){let replacedText=text;replacedText=replacedText.replace(HOST_DIR,HOST_DIR_REPLACMENT);replacedText=replacedText.replace(EL_DIR,EL_DIR_REPLACMENT);if(text!==replacedText){this.__activateDir=!0}return replacedText}constructor(){super();this.__autoDirOptOut=!1}ready(){super.ready();this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){if(elementBase.prototype.connectedCallback){super.connectedCallback()}if(this.constructor.__activateDir){takeRecords();DIR_INSTANCES.push(this);setRTL(this)}}disconnectedCallback(){if(elementBase.prototype.disconnectedCallback){super.disconnectedCallback()}if(this.constructor.__activateDir){const idx=DIR_INSTANCES.indexOf(this);if(-1<idx){DIR_INSTANCES.splice(idx,1)}}}}Dir.__activateDir=!1;return Dir});var dirMixin={DirMixin:DirMixin};let scheduled=!1,beforeRenderQueue=[],afterRenderQueue=[];function schedule(){scheduled=!0;requestAnimationFrame(function(){scheduled=!1;flushQueue(beforeRenderQueue);setTimeout(function(){runQueue(afterRenderQueue)})})}function flushQueue(queue){while(queue.length){callMethod(queue.shift())}}function runQueue(queue){for(let i=0,l=queue.length;i<l;i++){callMethod(queue.shift())}}function callMethod(info){const context=info[0],callback=info[1],args=info[2];try{callback.apply(context,args)}catch(e){setTimeout(()=>{throw e})}}function flush(){while(beforeRenderQueue.length||afterRenderQueue.length){flushQueue(beforeRenderQueue);flushQueue(afterRenderQueue)}scheduled=!1}function beforeNextRender(context,callback,args){if(!scheduled){schedule()}beforeRenderQueue.push([context,callback,args])}function afterNextRender(context,callback,args){if(!scheduled){schedule()}afterRenderQueue.push([context,callback,args])}var renderStatus={flush:flush,beforeNextRender:beforeNextRender,afterNextRender:afterNextRender};function resolve(){document.body.removeAttribute("unresolved")}if("interactive"===document.readyState||"complete"===document.readyState){resolve()}else{window.addEventListener("DOMContentLoaded",resolve)}function newSplice(index,removed,addedCount){return{index:index,removed:removed,addedCount:addedCount}}const EDIT_LEAVE=0,EDIT_UPDATE=1,EDIT_ADD=2,EDIT_DELETE=3;function calcEditDistances(current,currentStart,currentEnd,old,oldStart,oldEnd){let rowCount=oldEnd-oldStart+1,columnCount=currentEnd-currentStart+1,distances=Array(rowCount);for(let i=0;i<rowCount;i++){distances[i]=Array(columnCount);distances[i][0]=i}for(let j=0;j<columnCount;j++)distances[0][j]=j;for(let i=1;i<rowCount;i++){for(let j=1;j<columnCount;j++){if(equals(current[currentStart+j-1],old[oldStart+i-1]))distances[i][j]=distances[i-1][j-1];else{let north=distances[i-1][j]+1,west=distances[i][j-1]+1;distances[i][j]=north<west?north:west}}}return distances}function spliceOperationsFromEditDistances(distances){let i=distances.length-1,j=distances[0].length-1,current=distances[i][j],edits=[];while(0<i||0<j){if(0==i){edits.push(EDIT_ADD);j--;continue}if(0==j){edits.push(EDIT_DELETE);i--;continue}let northWest=distances[i-1][j-1],west=distances[i-1][j],north=distances[i][j-1],min;if(west<north)min=west<northWest?west:northWest;else min=north<northWest?north:northWest;if(min==northWest){if(northWest==current){edits.push(EDIT_LEAVE)}else{edits.push(EDIT_UPDATE);current=northWest}i--;j--}else if(min==west){edits.push(EDIT_DELETE);i--;current=west}else{edits.push(EDIT_ADD);j--;current=north}}edits.reverse();return edits}function calcSplices(current,currentStart,currentEnd,old,oldStart,oldEnd){let prefixCount=0,suffixCount=0,splice,minLength=Math.min(currentEnd-currentStart,oldEnd-oldStart);if(0==currentStart&&0==oldStart)prefixCount=sharedPrefix(current,old,minLength);if(currentEnd==current.length&&oldEnd==old.length)suffixCount=sharedSuffix(current,old,minLength-prefixCount);currentStart+=prefixCount;oldStart+=prefixCount;currentEnd-=suffixCount;oldEnd-=suffixCount;if(0==currentEnd-currentStart&&0==oldEnd-oldStart)return[];if(currentStart==currentEnd){splice=newSplice(currentStart,[],0);while(oldStart<oldEnd)splice.removed.push(old[oldStart++]);return[splice]}else if(oldStart==oldEnd)return[newSplice(currentStart,[],currentEnd-currentStart)];let ops=spliceOperationsFromEditDistances(calcEditDistances(current,currentStart,currentEnd,old,oldStart,oldEnd));splice=void 0;let splices=[],index=currentStart,oldIndex=oldStart;for(let i=0;i<ops.length;i++){switch(ops[i]){case EDIT_LEAVE:if(splice){splices.push(splice);splice=void 0}index++;oldIndex++;break;case EDIT_UPDATE:if(!splice)splice=newSplice(index,[],0);splice.addedCount++;index++;splice.removed.push(old[oldIndex]);oldIndex++;break;case EDIT_ADD:if(!splice)splice=newSplice(index,[],0);splice.addedCount++;index++;break;case EDIT_DELETE:if(!splice)splice=newSplice(index,[],0);splice.removed.push(old[oldIndex]);oldIndex++;break;}}if(splice){splices.push(splice)}return splices}function sharedPrefix(current,old,searchLength){for(let i=0;i<searchLength;i++)if(!equals(current[i],old[i]))return i;return searchLength}function sharedSuffix(current,old,searchLength){let index1=current.length,index2=old.length,count=0;while(count<searchLength&&equals(current[--index1],old[--index2]))count++;return count}function calculateSplices(current,previous){return calcSplices(current,0,current.length,previous,0,previous.length)}function equals(currentValue,previousValue){return currentValue===previousValue}var arraySplice={calculateSplices:calculateSplices};function isSlot(node){return"slot"===node.localName}class FlattenedNodesObserver{static getFlattenedNodes(node){if(isSlot(node)){node=node;return node.assignedNodes({flatten:!0})}else{return Array.from(node.childNodes).map(node=>{if(isSlot(node)){node=node;return node.assignedNodes({flatten:!0})}else{return[node]}}).reduce((a,b)=>a.concat(b),[])}}constructor(target,callback){this._shadyChildrenObserver=null;this._nativeChildrenObserver=null;this._connected=!1;this._target=target;this.callback=callback;this._effectiveNodes=[];this._observer=null;this._scheduled=!1;this._boundSchedule=()=>{this._schedule()};this.connect();this._schedule()}connect(){if(isSlot(this._target)){this._listenSlots([this._target])}else if(this._target.children){this._listenSlots(this._target.children);if(window.ShadyDOM){this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,mutations=>{this._processMutations(mutations)})}else{this._nativeChildrenObserver=new MutationObserver(mutations=>{this._processMutations(mutations)});this._nativeChildrenObserver.observe(this._target,{childList:!0})}}this._connected=!0}disconnect(){if(isSlot(this._target)){this._unlistenSlots([this._target])}else if(this._target.children){this._unlistenSlots(this._target.children);if(window.ShadyDOM&&this._shadyChildrenObserver){ShadyDOM.unobserveChildren(this._shadyChildrenObserver);this._shadyChildrenObserver=null}else if(this._nativeChildrenObserver){this._nativeChildrenObserver.disconnect();this._nativeChildrenObserver=null}}this._connected=!1}_schedule(){if(!this._scheduled){this._scheduled=!0;microTask.run(()=>this.flush())}}_processMutations(mutations){this._processSlotMutations(mutations);this.flush()}_processSlotMutations(mutations){if(mutations){for(let i=0,mutation;i<mutations.length;i++){mutation=mutations[i];if(mutation.addedNodes){this._listenSlots(mutation.addedNodes)}if(mutation.removedNodes){this._unlistenSlots(mutation.removedNodes)}}}}flush(){if(!this._connected){return!1}if(window.ShadyDOM){ShadyDOM.flush()}if(this._nativeChildrenObserver){this._processSlotMutations(this._nativeChildrenObserver.takeRecords())}else if(this._shadyChildrenObserver){this._processSlotMutations(this._shadyChildrenObserver.takeRecords())}this._scheduled=!1;let info={target:this._target,addedNodes:[],removedNodes:[]},newNodes=this.constructor.getFlattenedNodes(this._target),splices=calculateSplices(newNodes,this._effectiveNodes);for(let i=0,s;i<splices.length&&(s=splices[i]);i++){for(let j=0,n;j<s.removed.length&&(n=s.removed[j]);j++){info.removedNodes.push(n)}}for(let i=0,s;i<splices.length&&(s=splices[i]);i++){for(let j=s.index;j<s.index+s.addedCount;j++){info.addedNodes.push(newNodes[j])}}this._effectiveNodes=newNodes;let didFlush=!1;if(info.addedNodes.length||info.removedNodes.length){didFlush=!0;this.callback.call(this._target,info)}return didFlush}_listenSlots(nodeList){for(let i=0,n;i<nodeList.length;i++){n=nodeList[i];if(isSlot(n)){n.addEventListener("slotchange",this._boundSchedule)}}}_unlistenSlots(nodeList){for(let i=0,n;i<nodeList.length;i++){n=nodeList[i];if(isSlot(n)){n.removeEventListener("slotchange",this._boundSchedule)}}}}var flattenedNodesObserver={FlattenedNodesObserver:FlattenedNodesObserver};let debouncerQueue=[];const enqueueDebouncer=function(debouncer){debouncerQueue.push(debouncer)};function flushDebouncers(){const didFlush=!!debouncerQueue.length;while(debouncerQueue.length){try{debouncerQueue.shift().flush()}catch(e){setTimeout(()=>{throw e})}}return didFlush}const flush$1=function(){let shadyDOM,debouncers;do{shadyDOM=window.ShadyDOM&&ShadyDOM.flush();if(window.ShadyCSS&&window.ShadyCSS.ScopingShim){window.ShadyCSS.ScopingShim.flush()}debouncers=flushDebouncers()}while(shadyDOM||debouncers)};var flush$2={enqueueDebouncer:enqueueDebouncer,flush:flush$1};const p$1=Element.prototype,normalizedMatchesSelector=p$1.matches||p$1.matchesSelector||p$1.mozMatchesSelector||p$1.msMatchesSelector||p$1.oMatchesSelector||p$1.webkitMatchesSelector,matchesSelector=function(node,selector){return normalizedMatchesSelector.call(node,selector)};class DomApi{constructor(node){this.node=node}observeNodes(callback){return new FlattenedNodesObserver(this.node,callback)}unobserveNodes(observerHandle){observerHandle.disconnect()}notifyObserver(){}deepContains(node){if(this.node.contains(node)){return!0}let n=node,doc=node.ownerDocument;while(n&&n!==doc&&n!==this.node){n=n.parentNode||n.host}return n===this.node}getOwnerRoot(){return this.node.getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?this.node.assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let ip$=[],n=this.node.assignedSlot;while(n){ip$.push(n);n=n.assignedSlot}return ip$}importNode(node,deep){let doc=this.node instanceof Document?this.node:this.node.ownerDocument;return doc.importNode(node,deep)}getEffectiveChildNodes(){return FlattenedNodesObserver.getFlattenedNodes(this.node)}queryDistributedElements(selector){let c$=this.getEffectiveChildNodes(),list=[];for(let i=0,l=c$.length,c;i<l&&(c=c$[i]);i++){if(c.nodeType===Node.ELEMENT_NODE&&matchesSelector(c,selector)){list.push(c)}}return list}get activeElement(){let node=this.node;return node._activeElement!==void 0?node._activeElement:node.activeElement}}function forwardMethods(proto,methods){for(let i=0,method;i<methods.length;i++){method=methods[i];proto[method]=function(){return this.node[method].apply(this.node,arguments)}}}function forwardReadOnlyProperties(proto,properties){for(let i=0,name;i<properties.length;i++){name=properties[i];Object.defineProperty(proto,name,{get:function(){const domApi=this;return domApi.node[name]},configurable:!0})}}function forwardProperties(proto,properties){for(let i=0,name;i<properties.length;i++){name=properties[i];Object.defineProperty(proto,name,{get:function(){return this.node[name]},set:function(value){this.node[name]=value},configurable:!0})}}class EventApi{constructor(event){this.event=event}get rootTarget(){return this.event.composedPath()[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}DomApi.prototype.cloneNode;DomApi.prototype.appendChild;DomApi.prototype.insertBefore;DomApi.prototype.removeChild;DomApi.prototype.replaceChild;DomApi.prototype.setAttribute;DomApi.prototype.removeAttribute;DomApi.prototype.querySelector;DomApi.prototype.querySelectorAll;DomApi.prototype.parentNode;DomApi.prototype.firstChild;DomApi.prototype.lastChild;DomApi.prototype.nextSibling;DomApi.prototype.previousSibling;DomApi.prototype.firstElementChild;DomApi.prototype.lastElementChild;DomApi.prototype.nextElementSibling;DomApi.prototype.previousElementSibling;DomApi.prototype.childNodes;DomApi.prototype.children;DomApi.prototype.classList;DomApi.prototype.textContent;DomApi.prototype.innerHTML;forwardMethods(DomApi.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]);forwardReadOnlyProperties(DomApi.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]);forwardProperties(DomApi.prototype,["textContent","innerHTML"]);const dom=function(obj){obj=obj||document;if(!obj.__domApi){let helper;if(obj instanceof Event){helper=new EventApi(obj)}else{helper=new DomApi(obj)}obj.__domApi=helper}return obj.__domApi};var polymer_dom={matchesSelector:matchesSelector,DomApi:DomApi,EventApi:EventApi,dom:dom,flush:flush$1,addDebouncer:enqueueDebouncer};const bundledImportMeta$2={...import.meta,url:new URL("../../node_modules/%40polymer/polymer/lib/legacy/legacy-element-mixin.js",import.meta.url).href};let styleInterface=window.ShadyCSS;const LegacyElementMixin=dedupingMixin(base=>{const legacyElementBase=DirMixin(GestureEventListeners(ElementMixin(base))),DIRECTION_MAP={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class LegacyElement extends legacyElementBase{constructor(){super();this.isAttached;this.__boundListeners;this._debouncers;this._applyListeners()}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback();this.isAttached=!0;this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback();this.isAttached=!1;this.detached()}detached(){}attributeChangedCallback(name,old,value,namespace){if(old!==value){super.attributeChangedCallback(name,old,value,namespace);this.attributeChanged(name,old,value)}}attributeChanged(name,old,value){}_initializeProperties(){let proto=Object.getPrototypeOf(this);if(!proto.hasOwnProperty("__hasRegisterFinished")){proto.__hasRegisterFinished=!0;this._registered()}super._initializeProperties();this.root=this;this.created()}_registered(){}ready(){this._ensureAttributes();super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(value){return this._serializeValue(value)}deserialize(value,type){return this._deserializeValue(value,type)}reflectPropertyToAttribute(property,attribute,value){this._propertyToAttribute(property,attribute,value)}serializeValueToAttribute(value,attribute,node){this._valueToNodeAttribute(node||this,value,attribute)}extend(prototype,api){if(!(prototype&&api)){return prototype||api}let n$=Object.getOwnPropertyNames(api);for(let i=0,n,pd;i<n$.length&&(n=n$[i]);i++){pd=Object.getOwnPropertyDescriptor(api,n);if(pd){Object.defineProperty(prototype,n,pd)}}return prototype}mixin(target,source){for(let i in source){target[i]=source[i]}return target}chainObject(object,prototype){if(object&&prototype&&object!==prototype){object.__proto__=prototype}return object}instanceTemplate(template){let content=this.constructor._contentForTemplate(template),dom$$1=document.importNode(content,!0);return dom$$1}fire(type,detail,options){options=options||{};detail=null===detail||detail===void 0?{}:detail;let event=new Event(type,{bubbles:options.bubbles===void 0?!0:options.bubbles,cancelable:!!options.cancelable,composed:options.composed===void 0?!0:options.composed});event.detail=detail;let node=options.node||this;node.dispatchEvent(event);return event}listen(node,eventName,methodName){node=node||this;let hbl=this.__boundListeners||(this.__boundListeners=new WeakMap),bl=hbl.get(node);if(!bl){bl={};hbl.set(node,bl)}let key=eventName+methodName;if(!bl[key]){bl[key]=this._addMethodEventListenerToNode(node,eventName,methodName,this)}}unlisten(node,eventName,methodName){node=node||this;let bl=this.__boundListeners&&this.__boundListeners.get(node),key=eventName+methodName,handler=bl&&bl[key];if(handler){this._removeEventListenerFromNode(node,eventName,handler);bl[key]=null}}setScrollDirection(direction,node){setTouchAction(node||this,DIRECTION_MAP[direction]||"auto")}$$(slctr){return this.root.querySelector(slctr)}get domHost(){let root$$1=this.getRootNode();return root$$1 instanceof DocumentFragment?root$$1.host:root$$1}distributeContent(){if(window.ShadyDOM&&this.shadowRoot){ShadyDOM.flush()}}getEffectiveChildNodes(){const thisEl=this,domApi=dom(thisEl);return domApi.getEffectiveChildNodes()}queryDistributedElements(selector){const thisEl=this,domApi=dom(thisEl);return domApi.queryDistributedElements(selector)}getEffectiveChildren(){let list=this.getEffectiveChildNodes();return list.filter(function(n){return n.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let cn=this.getEffectiveChildNodes(),tc=[];for(let i=0,c;c=cn[i];i++){if(c.nodeType!==Node.COMMENT_NODE){tc.push(c.textContent)}}return tc.join("")}queryEffectiveChildren(selector){let e$=this.queryDistributedElements(selector);return e$&&e$[0]}queryAllEffectiveChildren(selector){return this.queryDistributedElements(selector)}getContentChildNodes(slctr){let content=this.root.querySelector(slctr||"slot");return content?dom(content).getDistributedNodes():[]}getContentChildren(slctr){let children=this.getContentChildNodes(slctr).filter(function(n){return n.nodeType===Node.ELEMENT_NODE});return children}isLightDescendant(node){const thisNode=this;return thisNode!==node&&thisNode.contains(node)&&thisNode.getRootNode()===node.getRootNode()}isLocalDescendant(node){return this.root===node.getRootNode()}scopeSubtree(container,shouldObserve){}getComputedStyleValue(property){return styleInterface.getComputedStyleValue(this,property)}debounce(jobName,callback,wait){this._debouncers=this._debouncers||{};return this._debouncers[jobName]=Debouncer.debounce(this._debouncers[jobName],0<wait?timeOut.after(wait):microTask,callback.bind(this))}isDebouncerActive(jobName){this._debouncers=this._debouncers||{};let debouncer=this._debouncers[jobName];return!!(debouncer&&debouncer.isActive())}flushDebouncer(jobName){this._debouncers=this._debouncers||{};let debouncer=this._debouncers[jobName];if(debouncer){debouncer.flush()}}cancelDebouncer(jobName){this._debouncers=this._debouncers||{};let debouncer=this._debouncers[jobName];if(debouncer){debouncer.cancel()}}async(callback,waitTime){return 0<waitTime?timeOut.run(callback.bind(this),waitTime):~microTask.run(callback.bind(this))}cancelAsync(handle){0>handle?microTask.cancel(~handle):timeOut.cancel(handle)}create(tag,props){let elt=document.createElement(tag);if(props){if(elt.setProperties){elt.setProperties(props)}else{for(let n in props){elt[n]=props[n]}}}return elt}elementMatches(selector,node){return matchesSelector(node||this,selector)}toggleAttribute(name,bool){let node=this;if(3===arguments.length){node=arguments[2]}if(1==arguments.length){bool=!node.hasAttribute(name)}if(bool){node.setAttribute(name,"");return!0}else{node.removeAttribute(name);return!1}}toggleClass(name,bool,node){node=node||this;if(1==arguments.length){bool=!node.classList.contains(name)}if(bool){node.classList.add(name)}else{node.classList.remove(name)}}transform(transformText,node){node=node||this;node.style.webkitTransform=transformText;node.style.transform=transformText}translate3d(x,y,z,node){node=node||this;this.transform("translate3d("+x+","+y+","+z+")",node)}arrayDelete(arrayOrPath,item){let index;if(Array.isArray(arrayOrPath)){index=arrayOrPath.indexOf(item);if(0<=index){return arrayOrPath.splice(index,1)}}else{let arr=get(this,arrayOrPath);index=arr.indexOf(item);if(0<=index){return this.splice(arrayOrPath,index,1)}}return null}_logger(level,args){if(Array.isArray(args)&&1===args.length&&Array.isArray(args[0])){args=args[0]}switch(level){case"log":case"warn":case"error":console[level](...args);}}_log(...args){this._logger("log",args)}_warn(...args){this._logger("warn",args)}_error(...args){this._logger("error",args)}_logf(methodName,...args){return["[%s::%s]",this.is,methodName,...args]}}LegacyElement.prototype.is="";return LegacyElement});var legacyElementMixin={LegacyElementMixin:LegacyElementMixin};let metaProps={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0};function mixinBehaviors(behaviors,klass){if(!behaviors){klass=klass;return klass}klass=LegacyElementMixin(klass);if(!Array.isArray(behaviors)){behaviors=[behaviors]}let superBehaviors=klass.prototype.behaviors;behaviors=flattenBehaviors(behaviors,null,superBehaviors);klass=_mixinBehaviors(behaviors,klass);if(superBehaviors){behaviors=superBehaviors.concat(behaviors)}klass.prototype.behaviors=behaviors;return klass}function _mixinBehaviors(behaviors,klass){for(let i=0,b;i<behaviors.length;i++){b=behaviors[i];if(b){klass=Array.isArray(b)?_mixinBehaviors(b,klass):GenerateClassFromInfo(b,klass)}}return klass}function flattenBehaviors(behaviors,list,exclude){list=list||[];for(let i=behaviors.length-1,b;0<=i;i--){b=behaviors[i];if(b){if(Array.isArray(b)){flattenBehaviors(b,list)}else{if(0>list.indexOf(b)&&(!exclude||0>exclude.indexOf(b))){list.unshift(b)}}}else{console.warn("behavior is null, check for missing or 404 import")}}return list}function GenerateClassFromInfo(info,Base){class PolymerGenerated extends Base{static get properties(){return info.properties}static get observers(){return info.observers}created(){super.created();if(info.created){info.created.call(this)}}_registered(){super._registered();if(info.beforeRegister){info.beforeRegister.call(Object.getPrototypeOf(this))}if(info.registered){info.registered.call(Object.getPrototypeOf(this))}}_applyListeners(){super._applyListeners();if(info.listeners){for(let l in info.listeners){this._addMethodEventListenerToNode(this,l,info.listeners[l])}}}_ensureAttributes(){if(info.hostAttributes){for(let a in info.hostAttributes){this._ensureAttribute(a,info.hostAttributes[a])}}super._ensureAttributes()}ready(){super.ready();if(info.ready){info.ready.call(this)}}attached(){super.attached();if(info.attached){info.attached.call(this)}}detached(){super.detached();if(info.detached){info.detached.call(this)}}attributeChanged(name,old,value){super.attributeChanged(name,old,value);if(info.attributeChanged){info.attributeChanged.call(this,name,old,value)}}}PolymerGenerated.generatedFrom=info;for(let p in info){if(!(p in metaProps)){let pd=Object.getOwnPropertyDescriptor(info,p);if(pd){Object.defineProperty(PolymerGenerated.prototype,p,pd)}}}return PolymerGenerated}const Class=function(info,mixin){if(!info){console.warn(`Polymer's Class function requires \`info\` argument`)}const baseWithBehaviors=info.behaviors?mixinBehaviors(info.behaviors,HTMLElement):LegacyElementMixin(HTMLElement),baseWithMixin=mixin?mixin(baseWithBehaviors):baseWithBehaviors,klass=GenerateClassFromInfo(info,baseWithMixin);klass.is=info.is;return klass};var _class={mixinBehaviors:mixinBehaviors,Class:Class};const Polymer=function(info){let klass;if("function"===typeof info){klass=info}else{klass=Polymer.Class(info)}customElements.define(klass.is,klass);return klass};Polymer.Class=Class;var polymerFn={Polymer:Polymer};function mutablePropertyChange(inst,property,value,old,mutableData){let isObject;if(mutableData){isObject="object"===typeof value&&null!==value;if(isObject){old=inst.__dataTemp[property]}}let shouldChange=old!==value&&(old===old||value===value);if(isObject&&shouldChange){inst.__dataTemp[property]=value}return shouldChange}const MutableData=dedupingMixin(superClass=>{class MutableData extends superClass{_shouldPropertyChange(property,value,old){return mutablePropertyChange(this,property,value,old,!0)}}return MutableData}),OptionalMutableData=dedupingMixin(superClass=>{class OptionalMutableData extends superClass{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(property,value,old){return mutablePropertyChange(this,property,value,old,this.mutableData)}}return OptionalMutableData});MutableData._mutablePropertyChange=mutablePropertyChange;var mutableData={MutableData:MutableData,OptionalMutableData:OptionalMutableData};let newInstance=null;function HTMLTemplateElementExtension(){return newInstance}HTMLTemplateElementExtension.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:HTMLTemplateElementExtension,writable:!0}});const DataTemplate=PropertyEffects(HTMLTemplateElementExtension),MutableDataTemplate=MutableData(DataTemplate);function upgradeTemplate(template,constructor){newInstance=template;Object.setPrototypeOf(template,constructor.prototype);new constructor;newInstance=null}const base=PropertyEffects(class{});class TemplateInstanceBase extends base{constructor(props){super();this._configureProperties(props);this.root=this._stampTemplate(this.__dataHost);let children=this.children=[];for(let n=this.root.firstChild;n;n=n.nextSibling){children.push(n);n.__templatizeInstance=this}if(this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__){this._showHideChildren(!0)}let options=this.__templatizeOptions;if(props&&options.instanceProps||!options.instanceProps){this._enableProperties()}}_configureProperties(props){let options=this.__templatizeOptions;if(options.forwardHostProp){for(let hprop in this.__hostProps){this._setPendingProperty(hprop,this.__dataHost["_host_"+hprop])}}for(let iprop in props){this._setPendingProperty(iprop,props[iprop])}}forwardHostProp(prop,value){if(this._setPendingPropertyOrPath(prop,value,!1,!0)){this.__dataHost._enqueueClient(this)}}_addEventListenerToNode(node,eventName,handler){if(this._methodHost&&this.__templatizeOptions.parentModel){this._methodHost._addEventListenerToNode(node,eventName,e=>{e.model=this;handler(e)})}else{let templateHost=this.__dataHost.__dataHost;if(templateHost){templateHost._addEventListenerToNode(node,eventName,handler)}}}_showHideChildren(hide){let c=this.children;for(let i=0,n;i<c.length;i++){n=c[i];if(!!hide!=!!n.__hideTemplateChildren__){if(n.nodeType===Node.TEXT_NODE){if(hide){n.__polymerTextContent__=n.textContent;n.textContent=""}else{n.textContent=n.__polymerTextContent__}}else if("slot"===n.localName){if(hide){n.__polymerReplaced__=document.createComment("hidden-slot");n.parentNode.replaceChild(n.__polymerReplaced__,n)}else{const replace=n.__polymerReplaced__;if(replace){replace.parentNode.replaceChild(n,replace)}}}else if(n.style){if(hide){n.__polymerDisplay__=n.style.display;n.style.display="none"}else{n.style.display=n.__polymerDisplay__}}}n.__hideTemplateChildren__=hide;if(n._showHideChildren){n._showHideChildren(hide)}}}_setUnmanagedPropertyToNode(node,prop,value){if(node.__hideTemplateChildren__&&node.nodeType==Node.TEXT_NODE&&"textContent"==prop){node.__polymerTextContent__=value}else{super._setUnmanagedPropertyToNode(node,prop,value)}}get parentModel(){let model=this.__parentModel;if(!model){let options;model=this;do{model=model.__dataHost.__dataHost}while((options=model.__templatizeOptions)&&!options.parentModel);this.__parentModel=model}return model}dispatchEvent(event){return!0}}TemplateInstanceBase.prototype.__dataHost;TemplateInstanceBase.prototype.__templatizeOptions;TemplateInstanceBase.prototype._methodHost;TemplateInstanceBase.prototype.__templatizeOwner;TemplateInstanceBase.prototype.__hostProps;const MutableTemplateInstanceBase=MutableData(TemplateInstanceBase);function findMethodHost(template){let templateHost=template.__dataHost;return templateHost&&templateHost._methodHost||templateHost}function createTemplatizerClass(template,templateInfo,options){let base=options.mutableData?MutableTemplateInstanceBase:TemplateInstanceBase,klass=class extends base{};klass.prototype.__templatizeOptions=options;klass.prototype._bindTemplate(template);addNotifyEffects(klass,template,templateInfo,options);return klass}function addPropagateEffects(template,templateInfo,options){let userForwardHostProp=options.forwardHostProp;if(userForwardHostProp){let klass=templateInfo.templatizeTemplateClass;if(!klass){let base=options.mutableData?MutableDataTemplate:DataTemplate;klass=templateInfo.templatizeTemplateClass=class TemplatizedTemplate extends base{};let hostProps=templateInfo.hostProps;for(let prop in hostProps){klass.prototype._addPropertyEffect("_host_"+prop,klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:createForwardHostPropEffect(prop,userForwardHostProp)});klass.prototype._createNotifyingProperty("_host_"+prop)}}upgradeTemplate(template,klass);if(template.__dataProto){Object.assign(template.__data,template.__dataProto)}template.__dataTemp={};template.__dataPending=null;template.__dataOld=null;template._enableProperties()}}function createForwardHostPropEffect(hostProp,userForwardHostProp){return function forwardHostProp(template,prop,props){userForwardHostProp.call(template.__templatizeOwner,prop.substring("_host_".length),props[prop])}}function addNotifyEffects(klass,template,templateInfo,options){let hostProps=templateInfo.hostProps||{};for(let iprop in options.instanceProps){delete hostProps[iprop];let userNotifyInstanceProp=options.notifyInstanceProp;if(userNotifyInstanceProp){klass.prototype._addPropertyEffect(iprop,klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:createNotifyInstancePropEffect(iprop,userNotifyInstanceProp)})}}if(options.forwardHostProp&&template.__dataHost){for(let hprop in hostProps){klass.prototype._addPropertyEffect(hprop,klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:createNotifyHostPropEffect()})}}}function createNotifyInstancePropEffect(instProp,userNotifyInstanceProp){return function notifyInstanceProp(inst,prop,props){userNotifyInstanceProp.call(inst.__templatizeOwner,inst,prop,props[prop])}}function createNotifyHostPropEffect(){return function notifyHostProp(inst,prop,props){inst.__dataHost._setPendingPropertyOrPath("_host_"+prop,props[prop],!0,!0)}}function templatize(template,owner,options){if(strictTemplatePolicy&&!findMethodHost(template)){throw new Error("strictTemplatePolicy: template owner not trusted")}options=options||{};if(template.__templatizeOwner){throw new Error("A <template> can only be templatized once")}template.__templatizeOwner=owner;const ctor=owner?owner.constructor:TemplateInstanceBase;let templateInfo=ctor._parseTemplate(template),baseClass=templateInfo.templatizeInstanceClass;if(!baseClass){baseClass=createTemplatizerClass(template,templateInfo,options);templateInfo.templatizeInstanceClass=baseClass}addPropagateEffects(template,templateInfo,options);let klass=class TemplateInstance extends baseClass{};klass.prototype._methodHost=findMethodHost(template);klass.prototype.__dataHost=template;klass.prototype.__templatizeOwner=owner;klass.prototype.__hostProps=templateInfo.hostProps;klass=klass;return klass}function modelForElement(template,node){let model;while(node){if(model=node.__templatizeInstance){if(model.__dataHost!=template){node=model.__dataHost}else{return model}}else{node=node.parentNode}}return null}var templatize$1={templatize:templatize,modelForElement:modelForElement,TemplateInstanceBase:TemplateInstanceBase};let TemplatizerUser;const Templatizer={templatize(template,mutableData){this._templatizerTemplate=template;this.ctor=templatize(template,this,{mutableData:!!mutableData,parentModel:this._parentModel,instanceProps:this._instanceProps,forwardHostProp:this._forwardHostPropV2,notifyInstanceProp:this._notifyInstancePropV2})},stamp(model){return new this.ctor(model)},modelForElement(el){return modelForElement(this._templatizerTemplate,el)}};var templatizerBehavior={Templatizer:Templatizer};const domBindBase=GestureEventListeners(OptionalMutableData(PropertyEffects(HTMLElement)));class DomBind extends domBindBase{static get observedAttributes(){return["mutable-data"]}constructor(){super();if(strictTemplatePolicy){throw new Error(`strictTemplatePolicy: dom-bind not allowed`)}this.root=null;this.$=null;this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none";this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){this.parentNode.insertBefore(this.root,this)}__removeChildren(){if(this.__children){for(let i=0;i<this.__children.length;i++){this.root.appendChild(this.__children[i])}}}render(){let template;if(!this.__children){template=template||this.querySelector("template");if(!template){let observer=new MutationObserver(()=>{template=this.querySelector("template");if(template){observer.disconnect();this.render()}else{throw new Error("dom-bind requires a <template> child")}});observer.observe(this,{childList:!0});return}this.root=this._stampTemplate(template);this.$=this.root.$;this.__children=[];for(let n=this.root.firstChild;n;n=n.nextSibling){this.__children[this.__children.length]=n}this._enableProperties()}this.__insertChildren();this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}}customElements.define("dom-bind",DomBind);var domBind={DomBind:DomBind};const domRepeatBase=OptionalMutableData(PolymerElement);class DomRepeat extends domRepeatBase{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super();this.__instances=[];this.__limit=1/0;this.__pool=[];this.__renderDebouncer=null;this.__itemsIdxToInstIdx={};this.__chunkCount=null;this.__lastChunkTime=null;this.__sortFn=null;this.__filterFn=null;this.__observePaths=null;this.__ctor=null;this.__isDetached=!0;this.template=null}disconnectedCallback(){super.disconnectedCallback();this.__isDetached=!0;for(let i=0;i<this.__instances.length;i++){this.__detachInstance(i)}}connectedCallback(){super.connectedCallback();this.style.display="none";if(this.__isDetached){this.__isDetached=!1;let parent=this.parentNode;for(let i=0;i<this.__instances.length;i++){this.__attachInstance(i,parent)}}}__ensureTemplatized(){if(!this.__ctor){let template=this.template=this.querySelector("template");if(!template){let observer=new MutationObserver(()=>{if(this.querySelector("template")){observer.disconnect();this.__render()}else{throw new Error("dom-repeat requires a <template> child")}});observer.observe(this,{childList:!0});return!1}let instanceProps={};instanceProps[this.as]=!0;instanceProps[this.indexAs]=!0;instanceProps[this.itemsIndexAs]=!0;this.__ctor=templatize(template,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:instanceProps,forwardHostProp:function(prop,value){let i$=this.__instances;for(let i=0,inst;i<i$.length&&(inst=i$[i]);i++){inst.forwardHostProp(prop,value)}},notifyInstanceProp:function(inst,prop,value){if(matches(this.as,prop)){let idx=inst[this.itemsIndexAs];if(prop==this.as){this.items[idx]=value}let path=translate$1(this.as,"items."+idx,prop);this.notifyPath(path,value)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(functionOrMethodName){if("string"===typeof functionOrMethodName){let methodName=functionOrMethodName,obj=this.__getMethodHost();return function(){return obj[methodName].apply(obj,arguments)}}return functionOrMethodName}__sortChanged(sort){this.__sortFn=this.__functionFromPropertyValue(sort);if(this.items){this.__debounceRender(this.__render)}}__filterChanged(filter){this.__filterFn=this.__functionFromPropertyValue(filter);if(this.items){this.__debounceRender(this.__render)}}__computeFrameTime(rate){return Math.ceil(1e3/rate)}__initializeChunking(){if(this.initialCount){this.__limit=this.initialCount;this.__chunkCount=this.initialCount;this.__lastChunkTime=performance.now()}}__tryRenderChunk(){if(this.items&&this.__limit<this.items.length){this.__debounceRender(this.__requestRenderChunk)}}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let currChunkTime=performance.now(),ratio=this._targetFrameTime/(currChunkTime-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*ratio)||1;this.__limit+=this.__chunkCount;this.__lastChunkTime=currChunkTime;this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(change){if(this.items&&!Array.isArray(this.items)){console.warn("dom-repeat expected array for `items`, found",this.items)}if(!this.__handleItemPath(change.path,change.value)){this.__initializeChunking();this.__debounceRender(this.__render)}}__handleObservedPaths(path){if(this.__sortFn||this.__filterFn){if(!path){this.__debounceRender(this.__render,this.delay)}else if(this.__observePaths){let paths=this.__observePaths;for(let i=0;i<paths.length;i++){if(0===path.indexOf(paths[i])){this.__debounceRender(this.__render,this.delay)}}}}}__debounceRender(fn,delay=0){this.__renderDebouncer=Debouncer.debounce(this.__renderDebouncer,0<delay?timeOut.after(delay):microTask,fn.bind(this));enqueueDebouncer(this.__renderDebouncer)}render(){this.__debounceRender(this.__render);flush$1()}__render(){if(!this.__ensureTemplatized()){return}this.__applyFullRefresh();this.__pool.length=0;this._setRenderedItemCount(this.__instances.length);this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}));this.__tryRenderChunk()}__applyFullRefresh(){let items=this.items||[],isntIdxToItemsIdx=Array(items.length);for(let i=0;i<items.length;i++){isntIdxToItemsIdx[i]=i}if(this.__filterFn){isntIdxToItemsIdx=isntIdxToItemsIdx.filter((i,idx,array)=>this.__filterFn(items[i],idx,array))}if(this.__sortFn){isntIdxToItemsIdx.sort((a,b)=>this.__sortFn(items[a],items[b]))}const itemsIdxToInstIdx=this.__itemsIdxToInstIdx={};let instIdx=0;const limit=Math.min(isntIdxToItemsIdx.length,this.__limit);for(;instIdx<limit;instIdx++){let inst=this.__instances[instIdx],itemIdx=isntIdxToItemsIdx[instIdx],item=items[itemIdx];itemsIdxToInstIdx[itemIdx]=instIdx;if(inst){inst._setPendingProperty(this.as,item);inst._setPendingProperty(this.indexAs,instIdx);inst._setPendingProperty(this.itemsIndexAs,itemIdx);inst._flushProperties()}else{this.__insertInstance(item,instIdx,itemIdx)}}for(let i=this.__instances.length-1;i>=instIdx;i--){this.__detachAndRemoveInstance(i)}}__detachInstance(idx){let inst=this.__instances[idx];for(let i=0,el;i<inst.children.length;i++){el=inst.children[i];inst.root.appendChild(el)}return inst}__attachInstance(idx,parent){let inst=this.__instances[idx];parent.insertBefore(inst.root,this)}__detachAndRemoveInstance(idx){let inst=this.__detachInstance(idx);if(inst){this.__pool.push(inst)}this.__instances.splice(idx,1)}__stampInstance(item,instIdx,itemIdx){let model={};model[this.as]=item;model[this.indexAs]=instIdx;model[this.itemsIndexAs]=itemIdx;return new this.__ctor(model)}__insertInstance(item,instIdx,itemIdx){let inst=this.__pool.pop();if(inst){inst._setPendingProperty(this.as,item);inst._setPendingProperty(this.indexAs,instIdx);inst._setPendingProperty(this.itemsIndexAs,itemIdx);inst._flushProperties()}else{inst=this.__stampInstance(item,instIdx,itemIdx)}let beforeRow=this.__instances[instIdx+1],beforeNode=beforeRow?beforeRow.children[0]:this;this.parentNode.insertBefore(inst.root,beforeNode);this.__instances[instIdx]=inst;return inst}_showHideChildren(hidden){for(let i=0;i<this.__instances.length;i++){this.__instances[i]._showHideChildren(hidden)}}__handleItemPath(path,value){let itemsPath=path.slice(6),dot=itemsPath.indexOf("."),itemsIdx=0>dot?itemsPath:itemsPath.substring(0,dot);if(itemsIdx==parseInt(itemsIdx,10)){let itemSubPath=0>dot?"":itemsPath.substring(dot+1);this.__handleObservedPaths(itemSubPath);let instIdx=this.__itemsIdxToInstIdx[itemsIdx],inst=this.__instances[instIdx];if(inst){let itemPath=this.as+(itemSubPath?"."+itemSubPath:"");inst._setPendingPropertyOrPath(itemPath,value,!1,!0);inst._flushProperties()}return!0}}itemForElement(el){let instance=this.modelForElement(el);return instance&&instance[this.as]}indexForElement(el){let instance=this.modelForElement(el);return instance&&instance[this.indexAs]}modelForElement(el){return modelForElement(this.template,el)}}customElements.define(DomRepeat.is,DomRepeat);var domRepeat={DomRepeat:DomRepeat};class DomIf extends PolymerElement{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super();this.__renderDebouncer=null;this.__invalidProps=null;this.__instance=null;this._lastIf=!1;this.__ctor=null;this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=Debouncer.debounce(this.__renderDebouncer,microTask,()=>this.__render());enqueueDebouncer(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();if(!this.parentNode||this.parentNode.nodeType==Node.DOCUMENT_FRAGMENT_NODE&&!this.parentNode.host){this.__teardownInstance()}}connectedCallback(){super.connectedCallback();this.style.display="none";if(this.if){this.__debounceRender()}}render(){flush$1()}__render(){if(this.if){if(!this.__ensureInstance()){return}this._showHideChildren()}else if(this.restamp){this.__teardownInstance()}if(!this.restamp&&this.__instance){this._showHideChildren()}if(this.if!=this._lastIf){this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}));this._lastIf=this.if}}__ensureInstance(){let parentNode=this.parentNode;if(parentNode){if(!this.__ctor){let template=this.querySelector("template");if(!template){let observer=new MutationObserver(()=>{if(this.querySelector("template")){observer.disconnect();this.__render()}else{throw new Error("dom-if requires a <template> child")}});observer.observe(this,{childList:!0});return!1}this.__ctor=templatize(template,this,{mutableData:!0,forwardHostProp:function(prop,value){if(this.__instance){if(this.if){this.__instance.forwardHostProp(prop,value)}else{this.__invalidProps=this.__invalidProps||Object.create(null);this.__invalidProps[root(prop)]=!0}}}})}if(!this.__instance){this.__instance=new this.__ctor;parentNode.insertBefore(this.__instance.root,this)}else{this.__syncHostProperties();let c$=this.__instance.children;if(c$&&c$.length){let lastChild=this.previousSibling;if(lastChild!==c$[c$.length-1]){for(let i=0,n;i<c$.length&&(n=c$[i]);i++){parentNode.insertBefore(n,this)}}}}}return!0}__syncHostProperties(){let props=this.__invalidProps;if(props){for(let prop in props){this.__instance._setPendingProperty(prop,this.__dataHost[prop])}this.__invalidProps=null;this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let c$=this.__instance.children;if(c$&&c$.length){let parent=c$[0].parentNode;if(parent){for(let i=0,n;i<c$.length&&(n=c$[i]);i++){parent.removeChild(n)}}}this.__instance=null;this.__invalidProps=null}}_showHideChildren(){let hidden=this.__hideTemplateChildren__||!this.if;if(this.__instance){this.__instance._showHideChildren(hidden)}}}customElements.define(DomIf.is,DomIf);var domIf={DomIf:DomIf};let ArraySelectorMixin=dedupingMixin(superClass=>{let elementBase=ElementMixin(superClass);class ArraySelectorMixin extends elementBase{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super();this.__lastItems=null;this.__lastMulti=null;this.__selectedMap=null}__updateSelection(multi,itemsInfo){let path=itemsInfo.path;if("items"==path){let newItems=itemsInfo.base||[],lastItems=this.__lastItems,lastMulti=this.__lastMulti;if(multi!==lastMulti){this.clearSelection()}if(lastItems){let splices=calculateSplices(newItems,lastItems);this.__applySplices(splices)}this.__lastItems=newItems;this.__lastMulti=multi}else if("items.splices"==itemsInfo.path){this.__applySplices(itemsInfo.value.indexSplices)}else{let part=path.slice("items.".length),idx=parseInt(part,10);if(0>part.indexOf(".")&&part==idx){this.__deselectChangedIdx(idx)}}}__applySplices(splices){let selected=this.__selectedMap;for(let i=0,s;i<splices.length;i++){s=splices[i];selected.forEach((idx,item)=>{if(idx<s.index){}else if(idx>=s.index+s.removed.length){selected.set(item,idx+s.addedCount-s.removed.length)}else{selected.set(item,-1)}});for(let j=0,idx;j<s.addedCount;j++){idx=s.index+j;if(selected.has(this.items[idx])){selected.set(this.items[idx],idx)}}}this.__updateLinks();let sidx=0;selected.forEach((idx,item)=>{if(0>idx){if(this.multi){this.splice("selected",sidx,1)}else{this.selected=this.selectedItem=null}selected.delete(item)}else{sidx++}})}__updateLinks(){this.__dataLinkedPaths={};if(this.multi){let sidx=0;this.__selectedMap.forEach(idx=>{if(0<=idx){this.linkPaths("items."+idx,"selected."+sidx++)}})}else{this.__selectedMap.forEach(idx=>{this.linkPaths("selected","items."+idx);this.linkPaths("selectedItem","items."+idx)})}}clearSelection(){this.__dataLinkedPaths={};this.__selectedMap=new Map;this.selected=this.multi?[]:null;this.selectedItem=null}isSelected(item){return this.__selectedMap.has(item)}isIndexSelected(idx){return this.isSelected(this.items[idx])}__deselectChangedIdx(idx){let sidx=this.__selectedIndexForItemIndex(idx);if(0<=sidx){let i=0;this.__selectedMap.forEach((idx,item)=>{if(sidx==i++){this.deselect(item)}})}}__selectedIndexForItemIndex(idx){let selected=this.__dataLinkedPaths["items."+idx];if(selected){return parseInt(selected.slice("selected.".length),10)}}deselect(item){let idx=this.__selectedMap.get(item);if(0<=idx){this.__selectedMap.delete(item);let sidx;if(this.multi){sidx=this.__selectedIndexForItemIndex(idx)}this.__updateLinks();if(this.multi){this.splice("selected",sidx,1)}else{this.selected=this.selectedItem=null}}}deselectIndex(idx){this.deselect(this.items[idx])}select(item){this.selectIndex(this.items.indexOf(item))}selectIndex(idx){let item=this.items[idx];if(!this.isSelected(item)){if(!this.multi){this.__selectedMap.clear()}this.__selectedMap.set(item,idx);this.__updateLinks();if(this.multi){this.push("selected",item)}else{this.selected=this.selectedItem=item}}else if(this.toggle){this.deselectIndex(idx)}}}return ArraySelectorMixin}),baseArraySelector=ArraySelectorMixin(PolymerElement);class ArraySelector extends baseArraySelector{static get is(){return"array-selector"}}customElements.define(ArraySelector.is,ArraySelector);var arraySelector={ArraySelectorMixin:ArraySelectorMixin,ArraySelector:ArraySelector};"use strict";const customStyleInterface$1=new CustomStyleInterface;if(!window.ShadyCSS){window.ShadyCSS={prepareTemplate(template,elementName,elementExtends){},prepareTemplateDom(template,elementName){},prepareTemplateStyles(template,elementName,elementExtends){},styleSubtree(element,properties){customStyleInterface$1.processStyles();updateNativeProperties(element,properties)},styleElement(element){customStyleInterface$1.processStyles()},styleDocument(properties){customStyleInterface$1.processStyles();updateNativeProperties(document.body,properties)},getComputedStyleValue(element,property){return getComputedStyleValue(element,property)},flushCustomStyles(){},nativeCss:nativeCssVariables,nativeShadow:nativeShadow,cssBuild:cssBuild}}window.ShadyCSS.CustomStyleInterface=customStyleInterface$1;const attr="include",CustomStyleInterface$1=window.ShadyCSS.CustomStyleInterface;class CustomStyle extends HTMLElement{constructor(){super();this._style=null;CustomStyleInterface$1.addCustomStyle(this)}getStyle(){if(this._style){return this._style}const style=this.querySelector("style");if(!style){return null}this._style=style;const include=style.getAttribute(attr);if(include){style.removeAttribute(attr);style.textContent=cssFromModules(include)+style.textContent}if(this.ownerDocument!==window.document){window.document.head.appendChild(this)}return this._style}}window.customElements.define("custom-style",CustomStyle);var customStyle={CustomStyle:CustomStyle};let mutablePropertyChange$1;(()=>{mutablePropertyChange$1=MutableData._mutablePropertyChange})();const MutableDataBehavior={_shouldPropertyChange(property,value,old){return mutablePropertyChange$1(this,property,value,old,!0)}},OptionalMutableDataBehavior={properties:{mutableData:Boolean},_shouldPropertyChange(property,value,old){return mutablePropertyChange$1(this,property,value,old,this.mutableData)}};var mutableDataBehavior={MutableDataBehavior:MutableDataBehavior,OptionalMutableDataBehavior:OptionalMutableDataBehavior};const Base=LegacyElementMixin(HTMLElement).prototype;var polymerLegacy={Base:Base,Polymer:Polymer,html:html};Polymer({is:"iron-request",hostAttributes:{hidden:!0},properties:{xhr:{type:Object,notify:!0,readOnly:!0,value:function(){return new XMLHttpRequest}},response:{type:Object,notify:!0,readOnly:!0,value:function(){return null}},status:{type:Number,notify:!0,readOnly:!0,value:0},statusText:{type:String,notify:!0,readOnly:!0,value:""},completes:{type:Object,readOnly:!0,notify:!0,value:function(){return new Promise(function(resolve,reject){this.resolveCompletes=resolve;this.rejectCompletes=reject}.bind(this))}},progress:{type:Object,notify:!0,readOnly:!0,value:function(){return{}}},aborted:{type:Boolean,notify:!0,readOnly:!0,value:!1},errored:{type:Boolean,notify:!0,readOnly:!0,value:!1},timedOut:{type:Boolean,notify:!0,readOnly:!0,value:!1}},get succeeded(){if(this.errored||this.aborted||this.timedOut){return!1}var status=this.xhr.status||0;return 0===status||200<=status&&300>status},send:function(options){var xhr=this.xhr;if(0<xhr.readyState){return null}xhr.addEventListener("progress",function(progress){this._setProgress({lengthComputable:progress.lengthComputable,loaded:progress.loaded,total:progress.total});this.fire("iron-request-progress-changed",{value:this.progress})}.bind(this));xhr.addEventListener("error",function(error){this._setErrored(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("timeout",function(error){this._setTimedOut(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("abort",function(){this._setAborted(!0);this._updateStatus();var error=new Error("Request aborted."),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("loadend",function(){this._updateStatus();this._setResponse(this.parseResponse());if(!this.succeeded){var error=new Error("The request failed with status code: "+this.xhr.status),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response);return}this.resolveCompletes(this)}.bind(this));this.url=options.url;var isXHRAsync=!1!==options.async;xhr.open(options.method||"GET",options.url,isXHRAsync);var acceptType={json:"application/json",text:"text/plain",html:"text/html",xml:"application/xml",arraybuffer:"application/octet-stream"}[options.handleAs],headers=options.headers||Object.create(null),newHeaders=Object.create(null);for(var key in headers){newHeaders[key.toLowerCase()]=headers[key]}headers=newHeaders;if(acceptType&&!headers.accept){headers.accept=acceptType}Object.keys(headers).forEach(function(requestHeader){if(/[A-Z]/.test(requestHeader)){Base._error("Headers must be lower case, got",requestHeader)}xhr.setRequestHeader(requestHeader,headers[requestHeader])},this);if(isXHRAsync){xhr.timeout=options.timeout;var handleAs=options.handleAs;if(!!options.jsonPrefix||!handleAs){handleAs="text"}xhr.responseType=xhr._responseType=handleAs;if(!!options.jsonPrefix){xhr._jsonPrefix=options.jsonPrefix}}xhr.withCredentials=!!options.withCredentials;var body=this._encodeBodyObject(options.body,headers["content-type"]);xhr.send(body);return this.completes},parseResponse:function(){var xhr=this.xhr,responseType=xhr.responseType||xhr._responseType,preferResponseText=!this.xhr.responseType,prefixLen=xhr._jsonPrefix&&xhr._jsonPrefix.length||0;try{switch(responseType){case"json":if(preferResponseText||xhr.response===void 0){try{return JSON.parse(xhr.responseText)}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.response;case"xml":return xhr.responseXML;case"blob":case"document":case"arraybuffer":return xhr.response;case"text":default:{if(prefixLen){try{return JSON.parse(xhr.responseText.substring(prefixLen))}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.responseText}}}catch(e){this.rejectCompletes(new Error("Could not parse response. "+e.message))}},abort:function(){this._setAborted(!0);this.xhr.abort()},_encodeBodyObject:function(body,contentType){if("string"==typeof body){return body}var bodyObj=body;switch(contentType){case"application/json":return JSON.stringify(bodyObj);case"application/x-www-form-urlencoded":return this._wwwFormUrlEncode(bodyObj);}return body},_wwwFormUrlEncode:function(object){if(!object){return""}var pieces=[];Object.keys(object).forEach(function(key){pieces.push(this._wwwFormUrlEncodePiece(key)+"="+this._wwwFormUrlEncodePiece(object[key]))},this);return pieces.join("&")},_wwwFormUrlEncodePiece:function(str){if(null===str||str===void 0||!str.toString){return""}return encodeURIComponent(str.toString().replace(/\r?\n/g,"\r\n")).replace(/%20/g,"+")},_updateStatus:function(){this._setStatus(this.xhr.status);this._setStatusText(this.xhr.statusText===void 0?"":this.xhr.statusText)}});Polymer({is:"iron-ajax",hostAttributes:{hidden:!0},properties:{url:{type:String},params:{type:Object,value:function(){return{}}},method:{type:String,value:"GET"},headers:{type:Object,value:function(){return{}}},contentType:{type:String,value:null},body:{type:Object,value:null},sync:{type:Boolean,value:!1},handleAs:{type:String,value:"json"},withCredentials:{type:Boolean,value:!1},timeout:{type:Number,value:0},auto:{type:Boolean,value:!1},verbose:{type:Boolean,value:!1},lastRequest:{type:Object,notify:!0,readOnly:!0},lastProgress:{type:Object,notify:!0,readOnly:!0},loading:{type:Boolean,notify:!0,readOnly:!0},lastResponse:{type:Object,notify:!0,readOnly:!0},lastError:{type:Object,notify:!0,readOnly:!0},activeRequests:{type:Array,notify:!0,readOnly:!0,value:function(){return[]}},debounceDuration:{type:Number,value:0,notify:!0},jsonPrefix:{type:String,value:""},bubbles:{type:Boolean,value:!1},rejectWithRequest:{type:Boolean,value:!1},_boundHandleResponse:{type:Function,value:function(){return this._handleResponse.bind(this)}}},observers:["_requestOptionsChanged(url, method, params.*, headers, contentType, "+"body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],created:function(){this._boundOnProgressChanged=this._onProgressChanged.bind(this)},get queryString(){var queryParts=[],param,value;for(param in this.params){value=this.params[param];param=window.encodeURIComponent(param);if(Array.isArray(value)){for(var i=0;i<value.length;i++){queryParts.push(param+"="+window.encodeURIComponent(value[i]))}}else if(null!==value){queryParts.push(param+"="+window.encodeURIComponent(value))}else{queryParts.push(param)}}return queryParts.join("&")},get requestUrl(){var queryString=this.queryString,url=this.url||"";if(queryString){var bindingChar=0<=url.indexOf("?")?"&":"?";return url+bindingChar+queryString}return url},get requestHeaders(){var headers={},contentType=this.contentType;if(null==contentType&&"string"===typeof this.body){contentType="application/x-www-form-urlencoded"}if(contentType){headers["content-type"]=contentType}var header;if("object"===typeof this.headers){for(header in this.headers){headers[header]=this.headers[header].toString()}}return headers},_onProgressChanged:function(event){this._setLastProgress(event.detail.value)},toRequestOptions:function(){return{url:this.requestUrl||"",method:this.method,headers:this.requestHeaders,body:this.body,async:!this.sync,handleAs:this.handleAs,jsonPrefix:this.jsonPrefix,withCredentials:this.withCredentials,timeout:this.timeout,rejectWithRequest:this.rejectWithRequest}},generateRequest:function(){var request=document.createElement("iron-request"),requestOptions=this.toRequestOptions();this.push("activeRequests",request);request.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this,request)).then(this._discardRequest.bind(this,request));var evt=this.fire("iron-ajax-presend",{request:request,options:requestOptions},{bubbles:this.bubbles,cancelable:!0});if(evt.defaultPrevented){request.abort();request.rejectCompletes(request);return request}if(this.lastRequest){this.lastRequest.removeEventListener("iron-request-progress-changed",this._boundOnProgressChanged)}request.addEventListener("iron-request-progress-changed",this._boundOnProgressChanged);request.send(requestOptions);this._setLastProgress(null);this._setLastRequest(request);this._setLoading(!0);this.fire("request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});return request},_handleResponse:function(request){if(request===this.lastRequest){this._setLastResponse(request.response);this._setLastError(null);this._setLoading(!1)}this.fire("response",request,{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-response",request,{bubbles:this.bubbles,composed:!0})},_handleError:function(request,error){if(this.verbose){Base._error(error)}if(request===this.lastRequest){this._setLastError({request:request,error:error,status:request.xhr.status,statusText:request.xhr.statusText,response:request.xhr.response});this._setLastResponse(null);this._setLoading(!1)}this.fire("iron-ajax-error",{request:request,error:error},{bubbles:this.bubbles,composed:!0});this.fire("error",{request:request,error:error},{bubbles:this.bubbles,composed:!0})},_discardRequest:function(request){var requestIndex=this.activeRequests.indexOf(request);if(-1<requestIndex){this.splice("activeRequests",requestIndex,1)}},_requestOptionsChanged:function(){this.debounce("generate-request",function(){if(null==this.url){return}if(this.auto){this.generateRequest()}},this.debounceDuration)}});const bundledImportMeta$3={...import.meta,url:new URL("../../node_modules/i18n-number/i18n-number.js",import.meta.url).href};var intlLibraryScript,intlLibraryLoadingStatus="initializing",_setupIntlPolyfillCalled=!1,formatCache=new Map;function _setupIntlPolyfill(){var intlLibraryUrl=this.resolveUrl("../intl/dist/Intl.min.js",this.importMeta.url);if(window.Intl){if(window.IntlPolyfill&&window.Intl===window.IntlPolyfill){intlLibraryLoadingStatus="loaded"}else{intlLibraryLoadingStatus="native"}}else{intlLibraryLoadingStatus="loading";intlLibraryScript=document.createElement("script");intlLibraryScript.setAttribute("src",intlLibraryUrl);intlLibraryScript.setAttribute("id","intl-js-library");intlLibraryScript.addEventListener("load",function intlLibraryLoaded(e){intlLibraryLoadingStatus="loaded";e.target.removeEventListener("load",intlLibraryLoaded);return!1});var s=document.querySelector("script")||document.body;s.parentNode.insertBefore(intlLibraryScript,s)}}function _setupIntlPolyfillLocale(locale,callback){if(!window.IntlPolyfill){switch(intlLibraryLoadingStatus){case"loading":if(intlLibraryScript){var libraryLoadedBindThis=function(e){_setupIntlPolyfillLocale.call(this,locale,callback);e.target.removeEventListener("load",libraryLoadedBindThis)}.bind(this);intlLibraryScript.addEventListener("load",libraryLoadedBindThis);return!1}else{console.error("Intl.js is not being loaded")}break;case"initializing":case"loaded":case"native":default:break;}}else{if("native"!==intlLibraryLoadingStatus){var supported=Intl.NumberFormat.supportedLocalesOf(locale,{localeMatcher:"lookup"}),script,intlScript;if(0===supported.length){var fallbackLanguages=_enumerateFallbackLanguages(locale);locale=fallbackLanguages.shift();script=document.querySelector("script#intl-js-locale-"+locale);if(!script){script=document.createElement("script");script.setAttribute("id","intl-js-locale-"+locale);script.setAttribute("src",this.resolveUrl("../intl/locale-data/jsonp/"+locale+".js",this.importMeta.url));var intlLocaleLoadedBindThis=function(e){if(e.target===script){e.target.removeEventListener("load",intlLocaleLoadedBindThis);callback.call(this,locale)}return!1}.bind(this),intlLocaleLoadErrorBindThis=function(e){if(e.target===script){e.target.removeEventListener("error",intlLocaleLoadErrorBindThis);script.setAttribute("loaderror","");locale=fallbackLanguages.shift();if(!locale){locale=this.DEFAULT_LANG}var fallbackSupport=Intl.NumberFormat.supportedLocalesOf(locale,{localeMatcher:"lookup"});if(0<fallbackSupport.length){callback.call(this,locale)}else{_setupIntlPolyfillLocale.call(this,locale,callback)}return!1}}.bind(this);script.addEventListener("load",intlLocaleLoadedBindThis);script.addEventListener("error",intlLocaleLoadErrorBindThis);intlScript=document.querySelector("script#intl-js-library")||document.body;intlScript.parentNode.insertBefore(script,intlScript.nextSibling)}else if(!script.hasAttribute("loaderror")){var anotherIntlLocaleLoadedBindThis=function(e){if(e.target===script){callback.call(this,locale);e.target.removeEventListener("load",anotherIntlLocaleLoadedBindThis);return!1}}.bind(this),anotherIntlLocaleLoadErrorBindThis=function(e){if(e.target===script){e.target.removeEventListener("error",anotherIntlLocaleLoadErrorBindThis);locale=fallbackLanguages.shift();if(!locale){locale=this.DEFAULT_LANG}var fallbackSupport=Intl.NumberFormat.supportedLocalesOf(locale,{localeMatcher:"lookup"});if(0<fallbackSupport.length){callback.call(this,locale)}else{_setupIntlPolyfillLocale.call(this,locale,callback)}return!1}}.bind(this);script.addEventListener("load",anotherIntlLocaleLoadedBindThis);script.addEventListener("error",anotherIntlLocaleLoadErrorBindThis)}else{var enSupport=Intl.NumberFormat.supportedLocalesOf(this.DEFAULT_LANG,{localeMatcher:"lookup"});if(0<enSupport.length){callback.call(this,this.DEFAULT_LANG)}else{_setupIntlPolyfillLocale.call(this,this.DEFAULT_LANG,callback)}}return!1}}}return!0}function _enumerateFallbackLanguages(lang){var result=[],parts,match,isExtLangCode=0,extLangCode,isScriptCode=0,scriptCode,isCountryCode=0,countryCode,n;if(!lang||0===lang.length){result.push("")}else{parts=lang.split(/[-_]/);if(0<parts.length&&parts[0].match(/^[A-Za-z]{2,3}$/)){parts[0]=parts[0].toLowerCase()}if(2<=parts.length&&parts[1].match(/^[A-Za-z]{3}$/)&&!parts[1].match(/^[Cc][Hh][SsTt]$/)){isExtLangCode=1;extLangCode=parts[1]=parts[1].toLowerCase()}if(parts.length>=isExtLangCode+2&&(match=parts[isExtLangCode+1].match(/^([A-Za-z])([A-Za-z]{3})$/))){isScriptCode=1;scriptCode=parts[isExtLangCode+1]=match[1].toUpperCase()+match[2].toLowerCase()}if(parts.length>=isExtLangCode+isScriptCode+2&&(match=parts[isExtLangCode+isScriptCode+1].match(/^[A-Za-z0-9]{2,3}$/))){isCountryCode=1;countryCode=parts[isExtLangCode+isScriptCode+1]=match[0].toUpperCase()}if(parts.length>=isExtLangCode+isScriptCode+isCountryCode+2){for(n=isExtLangCode+isScriptCode+isCountryCode+1;n<parts.length;n++){parts[n]=parts[n].toLowerCase()}}while(0<parts.length){if(!parts[parts.length-1].match(/^[xu]$/)){result.push(parts.join("-"))}if(isScriptCode&&isCountryCode&&parts.length==isExtLangCode+isScriptCode+2){parts.splice(isExtLangCode+isScriptCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode+isScriptCode,0,scriptCode)}if(isExtLangCode&&isCountryCode&&parts.length==isExtLangCode+isScriptCode+2){parts.splice(isExtLangCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode,0,extLangCode)}if(isExtLangCode&&isScriptCode&&parts.length==isExtLangCode+isScriptCode+1){parts.splice(isExtLangCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode,0,extLangCode)}if(!isScriptCode&&!isExtLangCode&&isCountryCode&&2==parts.length){switch(result[result.length-1]){case"zh-CN":case"zh-CHS":result.push("zh-Hans");break;case"zh-TW":case"zh-SG":case"zh-HK":case"zh-CHT":result.push("zh-Hant");break;default:break;}}parts.pop()}}return result}Polymer({importMeta:bundledImportMeta$3,is:"i18n-number",_template:(t=>{t.setAttribute("strip-whitespace","");return t})(html`<span id="number"></span>`),properties:{_lang:{type:String,value:"en",observer:"_langChanged",reflectToAttribute:!1},options:{type:Object,observer:"_optionsChanged",notify:!0},raw:{type:String,observer:"_rawChanged"},offset:{type:Number,value:0,observer:"_offsetChanged"},rawNumber:{type:Number,notify:!0},number:{type:Number,notify:!0},formatted:{type:String,notify:!0}},observers:["_onOptionsPropertyChanged(options.*)"],DEFAULT_LANG:"en",registered:function(){if(!_setupIntlPolyfillCalled){_setupIntlPolyfillCalled=!0;_setupIntlPolyfill.call(this)}},ready:function(){this._setupObservers();this.raw=this.textNode.data;if(!this.lang){this.lang=this.DEFAULT_LANG}},attached:function(){this.raw=this.textNode.data},_setupObservers:function(){let i=0;do{this.textNode=dom(this).childNodes[i++];if(!this.textNode){this.textNode=dom(this).childNodes[0];break}}while(this.textNode.nodeType!==this.textNode.TEXT_NODE);if(!this.textNode){dom(this).appendChild(document.createTextNode(""));this.textNode=dom(this).childNodes[0]}this.observer=new MutationObserver(this._textMutated.bind(this));this.observer.observe(this.textNode,{characterData:!0});this.observer.observe(this,{attributes:!0,attributeFilter:["lang"]});this.nodeObserver=dom(this).observeNodes(function(info){let i=0;do{if(info.addedNodes[i]&&info.addedNodes[i].nodeType===info.addedNodes[i].TEXT_NODE){this.textNode=info.addedNodes[i];this.raw=this.textNode.data;this.observer.observe(this.textNode,{characterData:!0});break}i++}while(i<info.addedNodes.length)}.bind(this))},_textMutated:function(mutations){mutations.forEach(function(mutation){switch(mutation.type){case"characterData":if(this.raw!==mutation.target.data){this.raw=mutation.target.data}break;case"attributes":if("lang"===mutation.attributeName){this._lang=this.lang}break;default:break;}},this)},_rawChanged:function(raw){if(this.textNode){if(raw!==this.textNode.data){this.textNode.data=raw}this._render(this.lang,this.options,raw,this.offset)}},_langChanged:function(lang){if(!lang){this.lang=this.DEFAULT_LANG;lang=this.lang}if(this.textNode){this._render(lang,this.options,this.raw,this.offset)}},_optionsChanged:function(options){if(this.textNode){this._render(this.lang,options,this.raw,this.offset)}},_onOptionsPropertyChanged:function(){if(this.textNode){this._render(this.lang,this.options,this.raw,this.offset)}},_offsetChanged:function(offset){if(this.textNode){this._render(this.lang,this.options,this.raw,offset)}},_getNumberFormatObject(lang,options){let formatId=lang+JSON.stringify(options),formatObject=formatCache.get(formatId);if(!formatObject){formatObject=new Intl.NumberFormat(lang,options);formatCache.set(formatId,formatObject)}return formatObject},_formatNumber:function(lang,options,number){if(!lang){lang=this.DEFAULT_LANG}switch(intlLibraryLoadingStatus){case"loaded":case"loading":default:try{if(_setupIntlPolyfillLocale.call(this,lang,function(locale){this.effectiveLang=locale;this._render.call(this,locale,this.options,this.raw,this.offset)}.bind(this))){return this._getNumberFormatObject(lang,options).format(number)}else{return}}catch(e){return number.toString()}break;case"native":try{return this._getNumberFormatObject(lang,options).format(number)}catch(e){return number.toString()}break;}},_render:function(lang,options,raw,offset){raw=raw.trim();if(!raw&&!this.formatted){return}if(raw){this.rawNumber=+raw;this.number=this.rawNumber-offset;this.formatted=this._formatNumber(lang,options,this.number)}else{this.rawNumber=void 0;this.number=void 0;this.formatted=""}this.$.number.textContent=this.formatted?this.formatted:"";if("undefined"!==typeof this.formatted){this.fire("rendered")}},render:function(){this._render(this.lang,this.options,this.raw,this.offset)}});const _cp=[function(n,ord){if(ord)return"other";return"other"},function(n,ord){if(ord)return"other";return 1==n?"one":"other"},function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"}];var plurals={af:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ak:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},am:function(n,ord){if(ord)return"other";return 0<=n&&1>=n?"one":"other"},ar:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n100=t0&&s[0].slice(-2);if(ord)return"other";return 0==n?"zero":1==n?"one":2==n?"two":3<=n100&&10>=n100?"few":11<=n100&&99>=n100?"many":"other"},ars:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n100=t0&&s[0].slice(-2);if(ord)return"other";return 0==n?"zero":1==n?"one":2==n?"two":3<=n100&&10>=n100?"few":11<=n100&&99>=n100?"many":"other"},as:function(n,ord){if(ord)return 1==n||5==n||7==n||8==n||9==n||10==n?"one":2==n||3==n?"two":4==n?"few":6==n?"many":"other";return 0<=n&&1>=n?"one":"other"},asa:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ast:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},az:function(n,ord){var s=(n+"").split("."),i=s[0],i10=i.slice(-1),i100=i.slice(-2),i1000=i.slice(-3);if(ord)return 1==i10||2==i10||5==i10||7==i10||8==i10||20==i100||50==i100||70==i100||80==i100?"one":3==i10||4==i10||100==i1000||200==i1000||300==i1000||400==i1000||500==i1000||600==i1000||700==i1000||800==i1000||900==i1000?"few":0==i||6==i10||40==i100||60==i100||90==i100?"many":"other";return 1==n?"one":"other"},be:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return(2==n10||3==n10)&&12!=n100&&13!=n100?"few":"other";return 1==n10&&11!=n100?"one":2<=n10&&4>=n10&&(12>n100||14<n100)?"few":t0&&0==n10||5<=n10&&9>=n10||11<=n100&&14>=n100?"many":"other"},bem:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},bez:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},bg:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},bh:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},bm:function(n,ord){if(ord)return"other";return"other"},bn:function(n,ord){if(ord)return 1==n||5==n||7==n||8==n||9==n||10==n?"one":2==n||3==n?"two":4==n?"few":6==n?"many":"other";return 0<=n&&1>=n?"one":"other"},bo:function(n,ord){if(ord)return"other";return"other"},br:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),n1000000=t0&&s[0].slice(-6);if(ord)return"other";return 1==n10&&11!=n100&&71!=n100&&91!=n100?"one":2==n10&&12!=n100&&72!=n100&&92!=n100?"two":(3==n10||4==n10||9==n10)&&(10>n100||19<n100)&&(70>n100||79<n100)&&(90>n100||99<n100)?"few":0!=n&&t0&&0==n1000000?"many":"other"},brx:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},bs:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&1==i10&&11!=i100||1==f10&&11!=f100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)||2<=f10&&4>=f10&&(12>f100||14<f100)?"few":"other"},ca:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return 1==n||3==n?"one":2==n?"two":4==n?"few":"other";return 1==n&&v0?"one":"other"},ce:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},cgg:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},chr:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ckb:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},cs:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":2<=i&&4>=i&&v0?"few":!v0?"many":"other"},cy:function(n,ord){if(ord)return 0==n||7==n||8==n||9==n?"zero":1==n?"one":2==n?"two":3==n||4==n?"few":5==n||6==n?"many":"other";return 0==n?"zero":1==n?"one":2==n?"two":3==n?"few":6==n?"many":"other"},da:function(n,ord){var s=(n+"").split("."),i=s[0],t0=+s[0]==n;if(ord)return"other";return 1==n||!t0&&(0==i||1==i)?"one":"other"},de:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},dsb:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return"other";return v0&&1==i100||1==f100?"one":v0&&2==i100||2==f100?"two":v0&&(3==i100||4==i100)||3==f100||4==f100?"few":"other"},dv:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},dz:function(n,ord){if(ord)return"other";return"other"},ee:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},el:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},en:function(n,ord){var s=(n+"").split("."),v0=!s[1],t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return 1==n10&&11!=n100?"one":2==n10&&12!=n100?"two":3==n10&&13!=n100?"few":"other";return 1==n&&v0?"one":"other"},eo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},es:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},et:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},eu:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},fa:function(n,ord){if(ord)return"other";return 0<=n&&1>=n?"one":"other"},ff:function(n,ord){if(ord)return"other";return 0<=n&&2>n?"one":"other"},fi:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},fil:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return 1==n?"one":"other";return v0&&(1==i||2==i||3==i)||v0&&4!=i10&&6!=i10&&9!=i10||!v0&&4!=f10&&6!=f10&&9!=f10?"one":"other"},fo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},fr:function(n,ord){if(ord)return 1==n?"one":"other";return 0<=n&&2>n?"one":"other"},fur:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},fy:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},ga:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return 1==n?"one":"other";return 1==n?"one":2==n?"two":t0&&3<=n&&6>=n?"few":t0&&7<=n&&10>=n?"many":"other"},gd:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return 1==n||11==n?"one":2==n||12==n?"two":3==n||13==n?"few":"other";return 1==n||11==n?"one":2==n||12==n?"two":t0&&3<=n&&10>=n||t0&&13<=n&&19>=n?"few":"other"},gl:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},gsw:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},gu:function(n,ord){if(ord)return 1==n?"one":2==n||3==n?"two":4==n?"few":6==n?"many":"other";return 0<=n&&1>=n?"one":"other"},guw:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},gv:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return v0&&1==i10?"one":v0&&2==i10?"two":v0&&(0==i100||20==i100||40==i100||60==i100||80==i100)?"few":!v0?"many":"other"},ha:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},haw:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},he:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],t0=+s[0]==n,n10=t0&&s[0].slice(-1);if(ord)return"other";return 1==n&&v0?"one":2==i&&v0?"two":v0&&(0>n||10<n)&&t0&&0==n10?"many":"other"},hi:function(n,ord){if(ord)return 1==n?"one":2==n||3==n?"two":4==n?"few":6==n?"many":"other";return 0<=n&&1>=n?"one":"other"},hr:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&1==i10&&11!=i100||1==f10&&11!=f100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)||2<=f10&&4>=f10&&(12>f100||14<f100)?"few":"other"},hsb:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return"other";return v0&&1==i100||1==f100?"one":v0&&2==i100||2==f100?"two":v0&&(3==i100||4==i100)||3==f100||4==f100?"few":"other"},hu:function(n,ord){if(ord)return 1==n||5==n?"one":"other";return 1==n?"one":"other"},hy:function(n,ord){if(ord)return 1==n?"one":"other";return 0<=n&&2>n?"one":"other"},ia:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},id:function(n,ord){if(ord)return"other";return"other"},ig:function(n,ord){if(ord)return"other";return"other"},ii:function(n,ord){if(ord)return"other";return"other"},in:function(n,ord){if(ord)return"other";return"other"},io:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},is:function(n,ord){var s=(n+"").split("."),i=s[0],t0=+s[0]==n,i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return t0&&1==i10&&11!=i100||!t0?"one":"other"},it:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return 11==n||8==n||80==n||800==n?"many":"other";return 1==n&&v0?"one":"other"},iu:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},iw:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],t0=+s[0]==n,n10=t0&&s[0].slice(-1);if(ord)return"other";return 1==n&&v0?"one":2==i&&v0?"two":v0&&(0>n||10<n)&&t0&&0==n10?"many":"other"},ja:function(n,ord){if(ord)return"other";return"other"},jbo:function(n,ord){if(ord)return"other";return"other"},jgo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ji:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},jmc:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},jv:function(n,ord){if(ord)return"other";return"other"},jw:function(n,ord){if(ord)return"other";return"other"},ka:function(n,ord){var s=(n+"").split("."),i=s[0],i100=i.slice(-2);if(ord)return 1==i?"one":0==i||2<=i100&&20>=i100||40==i100||60==i100||80==i100?"many":"other";return 1==n?"one":"other"},kab:function(n,ord){if(ord)return"other";return 0<=n&&2>n?"one":"other"},kaj:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},kcg:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},kde:function(n,ord){if(ord)return"other";return"other"},kea:function(n,ord){if(ord)return"other";return"other"},kk:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n10=t0&&s[0].slice(-1);if(ord)return 6==n10||9==n10||t0&&0==n10&&0!=n?"many":"other";return 1==n?"one":"other"},kkj:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},kl:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},km:function(n,ord){if(ord)return"other";return"other"},kn:function(n,ord){if(ord)return"other";return 0<=n&&1>=n?"one":"other"},ko:function(n,ord){if(ord)return"other";return"other"},ks:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ksb:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ksh:function(n,ord){if(ord)return"other";return 0==n?"zero":1==n?"one":"other"},ku:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},kw:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},ky:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},lag:function(n,ord){var s=(n+"").split("."),i=s[0];if(ord)return"other";return 0==n?"zero":(0==i||1==i)&&0!=n?"one":"other"},lb:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},lg:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},lkt:function(n,ord){if(ord)return"other";return"other"},ln:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},lo:function(n,ord){if(ord)return 1==n?"one":"other";return"other"},lt:function(n,ord){var s=(n+"").split("."),f=s[1]||"",t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return"other";return 1==n10&&(11>n100||19<n100)?"one":2<=n10&&9>=n10&&(11>n100||19<n100)?"few":0!=f?"many":"other"},lv:function(n,ord){var s=(n+"").split("."),f=s[1]||"",v=f.length,t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return"other";return t0&&0==n10||11<=n100&&19>=n100||2==v&&11<=f100&&19>=f100?"zero":1==n10&&11!=n100||2==v&&1==f10&&11!=f100||2!=v&&1==f10?"one":"other"},mas:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},mg:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},mgo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},mk:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return 1==i10&&11!=i100?"one":2==i10&&12!=i100?"two":(7==i10||8==i10)&&17!=i100&&18!=i100?"many":"other";return v0&&1==i10&&11!=i100||1==f10&&11!=f100?"one":"other"},ml:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},mn:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},mo:function(n,ord){var s=(n+"").split("."),v0=!s[1],t0=+s[0]==n,n100=t0&&s[0].slice(-2);if(ord)return 1==n?"one":"other";return 1==n&&v0?"one":!v0||0==n||1!=n&&1<=n100&&19>=n100?"few":"other"},mr:function(n,ord){if(ord)return 1==n?"one":2==n||3==n?"two":4==n?"few":"other";return 0<=n&&1>=n?"one":"other"},ms:function(n,ord){if(ord)return 1==n?"one":"other";return"other"},mt:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n100=t0&&s[0].slice(-2);if(ord)return"other";return 1==n?"one":0==n||2<=n100&&10>=n100?"few":11<=n100&&19>=n100?"many":"other"},my:function(n,ord){if(ord)return"other";return"other"},nah:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},naq:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},nb:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},nd:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ne:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return t0&&1<=n&&4>=n?"one":"other";return 1==n?"one":"other"},nl:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},nn:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},nnh:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},no:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},nqo:function(n,ord){if(ord)return"other";return"other"},nr:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},nso:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},ny:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},nyn:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},om:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},or:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return 1==n||5==n||t0&&7<=n&&9>=n?"one":2==n||3==n?"two":4==n?"few":6==n?"many":"other";return 1==n?"one":"other"},os:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},pa:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},pap:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},pl:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return 1==n&&v0?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)?"few":v0&&1!=i&&(0==i10||1==i10)||v0&&5<=i10&&9>=i10||v0&&12<=i100&&14>=i100?"many":"other"},prg:function(n,ord){var s=(n+"").split("."),f=s[1]||"",v=f.length,t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return"other";return t0&&0==n10||11<=n100&&19>=n100||2==v&&11<=f100&&19>=f100?"zero":1==n10&&11!=n100||2==v&&1==f10&&11!=f100||2!=v&&1==f10?"one":"other"},ps:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},pt:function(n,ord){var s=(n+"").split("."),i=s[0];if(ord)return"other";return 0==i||1==i?"one":"other"},"pt-PT":function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},rm:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ro:function(n,ord){var s=(n+"").split("."),v0=!s[1],t0=+s[0]==n,n100=t0&&s[0].slice(-2);if(ord)return 1==n?"one":"other";return 1==n&&v0?"one":!v0||0==n||1!=n&&1<=n100&&19>=n100?"few":"other"},rof:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},root:function(n,ord){if(ord)return"other";return"other"},ru:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return v0&&1==i10&&11!=i100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)?"few":v0&&0==i10||v0&&5<=i10&&9>=i10||v0&&11<=i100&&14>=i100?"many":"other"},rwk:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},sah:function(n,ord){if(ord)return"other";return"other"},saq:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},sc:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return 11==n||8==n||80==n||800==n?"many":"other";return 1==n&&v0?"one":"other"},scn:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return 11==n||8==n||80==n||800==n?"many":"other";return 1==n&&v0?"one":"other"},sd:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},sdh:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},se:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},seh:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ses:function(n,ord){if(ord)return"other";return"other"},sg:function(n,ord){if(ord)return"other";return"other"},sh:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&1==i10&&11!=i100||1==f10&&11!=f100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)||2<=f10&&4>=f10&&(12>f100||14<f100)?"few":"other"},shi:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return"other";return 0<=n&&1>=n?"one":t0&&2<=n&&10>=n?"few":"other"},si:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"";if(ord)return"other";return 0==n||1==n||0==i&&1==f?"one":"other"},sk:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":2<=i&&4>=i&&v0?"few":!v0?"many":"other"},sl:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],i100=i.slice(-2);if(ord)return"other";return v0&&1==i100?"one":v0&&2==i100?"two":v0&&(3==i100||4==i100)||!v0?"few":"other"},sma:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},smi:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},smj:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},smn:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},sms:function(n,ord){if(ord)return"other";return 1==n?"one":2==n?"two":"other"},sn:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},so:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},sq:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return 1==n?"one":4==n10&&14!=n100?"many":"other";return 1==n?"one":"other"},sr:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&1==i10&&11!=i100||1==f10&&11!=f100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)||2<=f10&&4>=f10&&(12>f100||14<f100)?"few":"other"},ss:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ssy:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},st:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},sv:function(n,ord){var s=(n+"").split("."),v0=!s[1],t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return(1==n10||2==n10)&&11!=n100&&12!=n100?"one":"other";return 1==n&&v0?"one":"other"},sw:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},syr:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ta:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},te:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},teo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},th:function(n,ord){if(ord)return"other";return"other"},ti:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},tig:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},tk:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n,n10=t0&&s[0].slice(-1);if(ord)return 6==n10||9==n10||10==n?"few":"other";return 1==n?"one":"other"},tl:function(n,ord){var s=(n+"").split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return 1==n?"one":"other";return v0&&(1==i||2==i||3==i)||v0&&4!=i10&&6!=i10&&9!=i10||!v0&&4!=f10&&6!=f10&&9!=f10?"one":"other"},tn:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},to:function(n,ord){if(ord)return"other";return"other"},tr:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ts:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},tzm:function(n,ord){var s=(n+"").split("."),t0=+s[0]==n;if(ord)return"other";return 0==n||1==n||t0&&11<=n&&99>=n?"one":"other"},ug:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},uk:function(n,ord){var s=(n+"").split("."),i=s[0],v0=!s[1],t0=+s[0]==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),i10=i.slice(-1),i100=i.slice(-2);if(ord)return 3==n10&&13!=n100?"few":"other";return v0&&1==i10&&11!=i100?"one":v0&&2<=i10&&4>=i10&&(12>i100||14<i100)?"few":v0&&0==i10||v0&&5<=i10&&9>=i10||v0&&11<=i100&&14>=i100?"many":"other"},ur:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},uz:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},ve:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},vi:function(n,ord){if(ord)return 1==n?"one":"other";return"other"},vo:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},vun:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},wa:function(n,ord){if(ord)return"other";return 0==n||1==n?"one":"other"},wae:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},wo:function(n,ord){if(ord)return"other";return"other"},xh:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},xog:function(n,ord){if(ord)return"other";return 1==n?"one":"other"},yi:function(n,ord){var s=(n+"").split("."),v0=!s[1];if(ord)return"other";return 1==n&&v0?"one":"other"},yo:function(n,ord){if(ord)return"other";return"other"},yue:function(n,ord){if(ord)return"other";return"other"},zh:function(n,ord){if(ord)return"other";return"other"},zu:function(n,ord){if(ord)return"other";return 0<=n&&1>=n?"one":"other"}},plurals$1={default:plurals};const bundledImportMeta$4={...import.meta,url:new URL("../../node_modules/i18n-format/i18n-format.js",import.meta.url).href};Polymer({importMeta:bundledImportMeta$4,_template:html` `,is:"i18n-format",properties:{_lang:{type:String,value:"en",reflectToAttribute:!1,observer:"_langChanged"},paramAttribute:{type:String,value:"slot"},paramFormat:{type:String,value:"{n}",observer:"_paramFormatChanged"},observeParams:{type:Boolean,value:!0}},DEFAULT_LANG:"en",ready:function(){this._setupParams();if(!this.lang){this.lang=this.DEFAULT_LANG}},attached:function(){this.render()},_setupParams:function(){var n;this.elements=Array.prototype.filter.call(dom(this).childNodes,function(node){return node.nodeType===node.ELEMENT_NODE});var needParamObservation=this.observeParams&&0<this.elements.length&&"json-data"===this.elements[0].tagName.toLowerCase();this.observer=new MutationObserver(this._templateMutated.bind(this));this.observer.observe(this,{attributes:!0,attributeFilter:["lang"]});for(n=0;n<this.elements.length;n++){if(0===n){this.templateElement=this.elements[n];let i=0;do{this.templateTextNode=dom(this.templateElement).childNodes[i++];if(!this.templateTextNode){this.templateTextNode=dom(this.templateElement).childNodes[0];break}}while(this.templateTextNode.nodeType!==this.templateTextNode.TEXT_NODE);this.observer.observe(this.templateTextNode,{characterData:!0})}else{if(!this.elements[n].hasAttribute(this.paramAttribute)){this.elements[n].setAttribute(this.paramAttribute,""+n)}if(needParamObservation){this.observer.observe(dom(this.elements[n]).childNodes[0],{characterData:!0});if("i18n-number"===this.elements[n].tagName.toLowerCase()){this.listen(this.elements[n],"rendered","render")}}}}},_templateMutated:function(mutations){mutations.forEach(function(mutation){switch(mutation.type){case"characterData":if("i18n-number"!==mutation.target.parentNode.tagName.toLowerCase()||"undefined"!==typeof mutation.target.parentNode.formatted){this.render()}break;case"attributes":if("lang"===mutation.attributeName){this._lang=this.lang}break;default:break;}},this)},_langChanged:function(lang){if(this.elements&&lang!==void 0&&null!==lang&&!lang.match(/^{{.*}}$/)&&!lang.match(/^\[\[.*\]\]$/)){this.render()}},_paramFormatChanged:function(paramFormat,oldParamFormat){if(this.elements&&oldParamFormat!==void 0&&paramFormat&&this.lang!==void 0&&null!==this.lang&&!this.lang.match(/^{{.*}}$/)&&!this.lang.match(/^\[\[.*\]\]$/)){this.lastTemplateText=void 0;this.render()}},_getPluralCategory:function(n){var category="other",lang=this.lang||this.DEFAULT_LANG;lang=lang.split(/[-_]/)[0];if(plurals[lang]){category=plurals[lang](n)}else{category=plurals.en(n)}return category},_selectTemplateText:function(){var templateText="";if(!this.templateElement){return templateText}else if("json-data"===this.templateElement.tagName.toLowerCase()){var templateObject;try{templateObject=JSON.parse(this.templateTextNode.data)}catch(ex){if(this.templateTextNode.data){console.warn("i18n-format: parse error in json-data")}return templateText}var n;for(n=1;"object"===typeof templateObject&&n<this.elements.length;n++){var param=this.elements[n];if("i18n-number"===param.tagName.toLowerCase()){var category=this._getPluralCategory(param.number);if("undefined"===typeof param.number||"undefined"===typeof param.formatted){templateObject=void 0}else if(templateObject[param.rawNumber]){templateObject=templateObject[param.rawNumber]}else if(templateObject[category]){templateObject=templateObject[category]}else if(templateObject.other){templateObject=templateObject.other}else{templateObject="";console.warn("i18n-format: cannot find a template")}}else{if(templateObject[param.textContent]){templateObject=templateObject[param.textContent]}else if(templateObject.other){templateObject=templateObject.other}else{templateObject="";console.warn("i18n-format: cannot find a template")}}}if("string"===typeof templateObject){templateText=templateObject}else if("undefined"===typeof templateObject){templateText=void 0}else{templateText="";console.warn("i18n-format: cannot find a template")}}else{templateText=this.templateTextNode.data}return templateText},render:function(){var templateText=this._selectTemplateText(),tmpNode=document.createElement("span"),paramPlaceholder,childNodes=[],i,shadyDomV1=!!window.ShadyDOM;if(templateText===this.lastTemplateText){return}else if("undefined"===typeof templateText){return}else{this.lastTemplateText=templateText}i=1;while(this.elements&&i<this.elements.length){paramPlaceholder=this.paramFormat.replace("n",i);templateText=templateText.replace(paramPlaceholder,"<slot name=\""+i+"\"></slot>");i++}tmpNode.innerHTML=templateText;this.root.innerHTML="";for(i=0;i<tmpNode.childNodes.length;i++){childNodes[i]=tmpNode.childNodes[i]}for(i=0;i<childNodes.length;i++){dom(this.root).appendChild(childNodes[i])}if(shadyDomV1){ShadyDOM.flush()}this.fire("rendered")}});Polymer({is:"iron-localstorage",properties:{name:{type:String,value:""},value:{type:Object,notify:!0},useRaw:{type:Boolean,value:!1},autoSaveDisabled:{type:Boolean,value:!1},errorMessage:{type:String,notify:!0},_loaded:{type:Boolean,value:!1}},observers:["_debounceReload(name,useRaw)","_trySaveValue(autoSaveDisabled)","_trySaveValue(value.*)"],ready:function(){this._boundHandleStorage=this._handleStorage.bind(this)},attached:function(){window.addEventListener("storage",this._boundHandleStorage)},detached:function(){window.removeEventListener("storage",this._boundHandleStorage)},_handleStorage:function(ev){if(ev.key==this.name){this._load(!0)}},_trySaveValue:function(){if(this.autoSaveDisabled===void 0||this._doNotSave){return}if(this._loaded&&!this.autoSaveDisabled){this.debounce("save",this.save)}},_debounceReload:function(){if(this.name!==void 0&&this.useRaw!==void 0){this.debounce("reload",this.reload)}},reload:function(){this._loaded=!1;this._load()},_load:function(externalChange){try{var v=window.localStorage.getItem(this.name)}catch(ex){this.errorMessage=ex.message;this._error("Could not save to localStorage.  Try enabling cookies for this page.",ex)}if(null===v){this._loaded=!0;this._doNotSave=!0;this.value=null;this._doNotSave=!1;this.fire("iron-localstorage-load-empty",{externalChange:externalChange},{composed:!0})}else{if(!this.useRaw){try{v=JSON.parse(v)}catch(x){this.errorMessage="Could not parse local storage value";Base._error("could not parse local storage value",v);v=null}}this._loaded=!0;this._doNotSave=!0;this.value=v;this._doNotSave=!1;this.fire("iron-localstorage-load",{externalChange:externalChange},{composed:!0})}},save:function(){var v=this.useRaw?this.value:JSON.stringify(this.value);try{if(null===this.value||this.value===void 0){window.localStorage.removeItem(this.name)}else{window.localStorage.setItem(this.name,v)}}catch(ex){this.errorMessage=ex.message;Base._error("Could not save to localStorage. Incognito mode may be blocking this action",ex)}}});const bundledImportMeta$5={...import.meta,url:new URL("../../node_modules/i18n-behavior/i18n-preference.js",import.meta.url).href},$_documentContainer=document.createElement("template");$_documentContainer.innerHTML=`<template id="i18n-preference">
  <iron-localstorage id="storage" name="i18n-behavior-preference" on-iron-localstorage-load-empty="_onLoadEmptyStorage" on-iron-localstorage-load="_onLoadStorage" on-value-changed="_onStorageValueChange">
  </iron-localstorage>
</template><div id="dom-module-placeholder"></div>`;var html$1=document.querySelector("html"),defaultLang=html$1.hasAttribute("lang")?html$1.getAttribute("lang"):"",template=$_documentContainer.content.querySelector("template#i18n-preference"),domModule$1=document.createElement("dom-module"),registerI18nPreference=function(){domModule$1.appendChild(template);domModule$1.register("i18n-preference");Polymer({importMeta:bundledImportMeta$5,is:"i18n-preference",properties:{persist:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_onPersistChange"}},ready:function(){if(this.persist){}else{}this.isReady=!0},attached:function(){this._observe();if(this.persist){}else{if(!html$1.hasAttribute("preferred")){html$1.setAttribute("lang",navigator.language||navigator.browserLanguage)}}},detached:function(){this._disconnect()},_onLoadEmptyStorage:function(){if(this.isReady){if(this.persist){if(this.isInitialized){this.$.storage.value=html$1.getAttribute("lang")}else{if(html$1.hasAttribute("preferred")){this.$.storage.value=html$1.getAttribute("lang")}else{this.$.storage.value=navigator.language||navigator.browserLanguage;if(html$1.getAttribute("lang")!==this.$.storage.value){html$1.setAttribute("lang",this.$.storage.value)}}this.isInitialized=!0}}else{}}},_onLoadStorage:function(){if(this.isReady){if(this.persist){if(html$1.hasAttribute("preferred")){if(this.$.storage.value!==defaultLang){this.$.storage.value=defaultLang}}else{html$1.setAttribute("lang",this.$.storage.value)}}else{this.$.storage.value=void 0}}},_onPersistChange:function(value){if(this.isReady){if(value){if(this.$.storage.value!==html$1.getAttribute("lang")){this.$.storage.value=html$1.getAttribute("lang")}}else{this.$.storage.value=void 0}}},_onStorageValueChange:function(e){var value=e.detail.value;if(this.isReady){if(this.persist){if(value){if(value!==html$1.getAttribute("lang")){html$1.setAttribute("lang",value)}}else{this.$.storage.value=html$1.getAttribute("lang")}}else{if(value){this.$.storage.value=void 0}}}},_htmlLangMutationObserverCallback:function(mutations){mutations.forEach(function(mutation){switch(mutation.type){case"attributes":if("lang"===mutation.attributeName){if(this.$.storage.value!==mutation.target.getAttribute("lang")){this.$.storage.value=mutation.target.getAttribute("lang")}}break;default:break;}}.bind(this))},_observe:function(){if(!this._htmlLangMutationObserver){this._htmlLangMutationObserverCallbackBindThis=this._htmlLangMutationObserverCallback.bind(this);this._htmlLangMutationObserver=new MutationObserver(this._htmlLangMutationObserverCallbackBindThis)}this._htmlLangMutationObserver.observe(html$1,{attributes:!0})},_disconnect:function(){if(this._htmlLangMutationObserver){this._htmlLangMutationObserver.disconnect()}}})};registerI18nPreference();const bundledImportMeta$6={...import.meta,url:new URL("../../node_modules/i18n-behavior/i18n-attr-repo.js",import.meta.url).href},$_documentContainer$1=document.createElement("template");$_documentContainer$1.innerHTML=`<template id="i18n-attr-repo">
    <template id="standard">
      <!-- Standard HTML5 -->
      <input placeholder="" value="type=button|submit">
      <any-elements title="" aria-label="\$" aria-valuetext="\$"></any-elements>

      <!-- Standard Polymer Elements -->
      <paper-input label="" error-message="" placeholder=""></paper-input>
      <paper-textarea label="" error-message="" placeholder=""></paper-textarea>
      <paper-dropdown-menu label=""></paper-dropdown-menu>
      <paper-toast text=""></paper-toast>
      <paper-badge label=""></paper-badge>
      <google-chart options="" cols="" rows="" data=""></google-chart>
      <google-signin label-signin="" label-signout="" label-additional=""></google-signin>
      <platinum-push-messaging title="" message=""></platinum-push-messaging>

      <!-- Specific to i18n-behavior -->
      <json-data any-attributes=""></json-data>
    </template>
</template>`;var sharedData={},template$1=$_documentContainer$1.content.querySelector("template#i18n-attr-repo"),domModule$2=document.createElement("dom-module");domModule$2.appendChild(template$1);domModule$2.register("i18n-attr-repo");window.BehaviorsStore=window.BehaviorsStore||{};var Polymer$1=function(proto){BehaviorsStore._I18nAttrRepo=proto;BehaviorsStore._I18nAttrRepo._created();return Polymer(proto)};Polymer$1({importMeta:bundledImportMeta$6,is:"i18n-attr-repo",created:function(){this.data=sharedData;var customAttributes=this.querySelector("template#custom");if(customAttributes&&!this.hasAttribute("processed")){this._traverseTemplateTree(customAttributes._content||customAttributes.content);this.setAttribute("processed","")}this._created()},_created:function(){this.data=sharedData;if(this.data.__ready__){return}this.data.__ready__=!0;var standardTemplate;if(!this.$){var t=DomModule.import(this.is,"template");standardTemplate=(t._content||t.content).querySelector("template#standard")}else{standardTemplate=this.$.standard}this._traverseTemplateTree(standardTemplate._content||standardTemplate.content)},isLocalizableAttribute:function(element,attr){var tagName=element.tagName.toLowerCase();if(!this.data){this._created();this.data=sharedData}attr=attr.replace(/\$$/,"");if(this.data["any-elements"]&&this.data["any-elements"][attr]){return this.data["any-elements"][attr]}else if(this.data[tagName]){return this.data[tagName]["any-attributes"]||this._getType(element,this.data[tagName][attr])}else{return!1}},_getType:function(element,value){var selector,result;if("object"===typeof value){for(selector in value){if(selector){if(this._matchAttribute(element,selector)){result=this._getType(element,value[selector]);if(result){return result}}}}if(value[""]){if(this._matchAttribute(element,"")){result=this._getType(element,value[""]);if(result){return result}}}return!1}else{return value}},_matchAttribute:function(element,selector){var value,match;if(""===selector){return!0}match=selector.match(/^([^!=]*)=(.*)$/);if(match){if(element.hasAttribute(match[1])){value=element.getAttribute(match[1]);return!!value.match(new RegExp("^"+match[2]+"$"))}else{return!1}}match=selector.match(/^!([^!=]*)$/);if(match){return!element.hasAttribute(match[1])}match=selector.match(/^([^!=]*)$/);if(match){if(element.hasAttribute(match[1])){value=element.getAttribute(match[1]);return!value}else{return!1}}return!1},_compareSelectors:function(s1,s2){var name1=s1.replace(/^!/,"").replace(/=.*$/,"").toLowerCase(),name2=s2.replace(/^!/,"").replace(/=.*$/,"").toLowerCase();return name1.localeCompare(name2)},setLocalizableAttribute:function(element,attr,value){this.data[element]=this.data[element]||{};var cursor=this.data[element],prev=attr,type=!0,selectors=[];if("string"===typeof value&&value){selectors=value.split(",");if(selectors[selectors.length-1].match(/^[^!=][^=]*$/)){type=selectors.pop()}selectors=selectors.map(function(selector){return selector.replace(/=$/,"")});selectors.sort(this._compareSelectors);while(""===selectors[0]){selectors.shift()}}selectors.forEach(function(selector,index){if("object"!==typeof cursor[prev]){cursor[prev]=cursor[prev]?{"":cursor[prev]}:{}}cursor[prev][selector]=cursor[prev][selector]||{};cursor=cursor[prev];prev=selector});if("object"===typeof cursor[prev]&&cursor[prev]&&Object.keys(cursor[prev]).length){cursor=cursor[prev];prev=""}cursor[prev]=type},registerLocalizableAttributes:function(element,template){if(!this.data){this._created();this.data=sharedData}if(!element){element=template.getAttribute("id")}if(element){var attrs=(template.getAttribute("text-attr")||"").split(" "),textAttr=!1;attrs.forEach(function(attr){if(attr){this.setLocalizableAttribute(element,attr,!0)}},this);Array.prototype.forEach.call(template.attributes,function(attr){switch(attr.name){case"id":case"lang":case"localizable-text":case"assetpath":break;case"text-attr":textAttr=!0;break;default:if(textAttr){this.setLocalizableAttribute(element,attr.name,attr.value)}break;}}.bind(this))}},_traverseTemplateTree:function(node){var name;if(node.nodeType===node.ELEMENT_NODE){name=node.nodeName.toLowerCase();Array.prototype.forEach.call(node.attributes,function(attribute){this.data[name]=this.data[name]||{};this.setLocalizableAttribute(name,attribute.name,attribute.value)},this)}if(0<node.childNodes.length){for(var i=0;i<node.childNodes.length;i++){this._traverseTemplateTree(node.childNodes[i])}}}});var deepcopy=function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=!0;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";module.exports=__webpack_require__(3)},function(module,exports){"use strict";exports.__esModule=!0;var toString=Object.prototype.toString,isBuffer="undefined"!==typeof Buffer?function isBuffer(obj){return Buffer.isBuffer(obj)}:function isBuffer(){return!1},getKeys="function"===typeof Object.keys?function getKeys(obj){return Object.keys(obj)}:function getKeys(obj){var objType=typeof obj;if(null===obj||"function"!==objType&&"object"!==objType){throw new TypeError("obj must be an Object")}var resultKeys=[],key;for(key in obj){Object.prototype.hasOwnProperty.call(obj,key)&&resultKeys.push(key)}return resultKeys},getSymbols="function"===typeof Symbol?function getSymbols(obj){return Object.getOwnPropertySymbols(obj)}:function getSymbols(){return[]};function indexOf(array,s){if("[object Array]"!==toString.call(array)){throw new TypeError("array must be an Array")}var i,len,value;for(i=0,len=array.length;i<len;++i){value=array[i];if(value===s||value!==value&&s!==s){return i}}return-1}exports.getKeys=getKeys;exports.getSymbols=getSymbols;exports.indexOf=indexOf;exports.isBuffer=isBuffer},function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0;exports.copyValue=exports.copyCollection=exports.copy=void 0;var _polyfill=__webpack_require__(1),toString=Object.prototype.toString;function copy(target,customizer){var resultValue=copyValue(target);if(null!==resultValue){return resultValue}return copyCollection(target,customizer)}function copyCollection(target,customizer){if("function"!==typeof customizer){throw new TypeError("customizer is must be a Function")}if("function"===typeof target){var source=target+"";if(/^\s*function\s*\S*\([^\)]*\)\s*{\s*\[native code\]\s*}/.test(source)){return target}else{return new Function("return "+(source+""))()}}var targetClass=toString.call(target);if("[object Array]"===targetClass){return[]}if("[object Object]"===targetClass&&target.constructor===Object){return{}}if("[object Date]"===targetClass){return new Date(target.getTime())}if("[object RegExp]"===targetClass){var regexpText=target+"",slashIndex=regexpText.lastIndexOf("/");return new RegExp(regexpText.slice(1,slashIndex),regexpText.slice(slashIndex+1))}if((0,_polyfill.isBuffer)(target)){var buffer=new Buffer(target.length);target.copy(buffer);return buffer}var customizerResult=customizer(target);if(void 0!==customizerResult){return customizerResult}return null}function copyValue(target){var targetType=typeof target;if(null!==target&&"object"!==targetType&&"function"!==targetType){return target}return null}exports.copy=copy;exports.copyCollection=copyCollection;exports.copyValue=copyValue},function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0;var _copy=__webpack_require__(2),_polyfill=__webpack_require__(1);function defaultCustomizer(target){return}function deepcopy(target){var customizer=1<arguments.length&&void 0!==arguments[1]?arguments[1]:defaultCustomizer;if(null===target){return null}var resultValue=(0,_copy.copyValue)(target);if(null!==resultValue){return resultValue}var resultCollection=(0,_copy.copyCollection)(target,customizer),clone=null!==resultCollection?resultCollection:target,visited=[target],reference=[clone];return recursiveCopy(target,customizer,clone,visited,reference)}function recursiveCopy(target,customizer,clone,visited,reference){if(null===target){return null}var resultValue=(0,_copy.copyValue)(target);if(null!==resultValue){return resultValue}var keys=(0,_polyfill.getKeys)(target).concat((0,_polyfill.getSymbols)(target)),i=void 0,len=void 0,key=void 0,value=void 0,index=void 0,resultCopy=void 0,result=void 0,ref=void 0;for(i=0,len=keys.length;i<len;++i){key=keys[i];value=target[key];index=(0,_polyfill.indexOf)(visited,value);resultCopy=void 0;result=void 0;ref=void 0;if(-1===index){resultCopy=(0,_copy.copy)(value,customizer);result=null!==resultCopy?resultCopy:value;if(null!==value&&/^(?:function|object)$/.test(typeof value)){visited.push(value);reference.push(result)}}else{ref=reference[index]}clone[key]=ref||recursiveCopy(value,customizer,result,visited,reference)}return clone}exports["default"]=deepcopy;module.exports=exports["default"]}])}(),deepcopy$1={default:deepcopy},html$2=document.querySelector("html"),bundles={"":{}},defaultLang$1=html$2.hasAttribute("lang")?html$2.getAttribute("lang"):"",bundleFetchingInstances={},startUrl=function(){var path=window.location.pathname;if(document.querySelector("meta[name=app-root]")&&document.querySelector("meta[name=app-root]").getAttribute("content")){path=document.querySelector("meta[name=app-root]").getAttribute("content")}else if(document.querySelector("link[rel=manifest]")&&document.querySelector("link[rel=manifest]").getAttribute("href")&&document.querySelector("link[rel=manifest]").getAttribute("href").match(/^\//)){path=document.querySelector("link[rel=manifest]").getAttribute("href")}return path.replace(/\/[^\/]*$/,"/")}(),localesPath=html$2.hasAttribute("locales-path")?html$2.getAttribute("locales-path"):"locales",paramAttribute="slot",attributesRepository=document.createElement("i18n-attr-repo"),userPreference=document.querySelector("i18n-preference");if(!userPreference){userPreference=document.createElement("i18n-preference");addEventListener("load",function(event){if(!document.querySelector("i18n-preference")){document.querySelector("body").appendChild(userPreference)}});setTimeout(function(){if(!document.querySelector("i18n-preference")){document.querySelector("body").appendChild(userPreference)}},0)}var debuglog=html$2.hasAttribute("debug")?function(arg){console.log(arg)}:function(){};window.BehaviorsStore=window.BehaviorsStore||{};BehaviorsStore.I18nControllerBehavior={properties:{isI18nController:{type:Boolean,value:!0,readOnly:!0},html:{type:Object,value:html$2},masterBundles:{type:Object,value:bundles},defaultLang:{type:String,value:defaultLang$1,readOnly:!0},bundleFetchingInstances:{type:Object,value:bundleFetchingInstances},startUrl:{type:String,value:startUrl,readOnly:!0},localesPath:{type:String,value:localesPath,readOnly:!0},attributesRepository:{type:Object,value:attributesRepository,readOnly:!0},userPreference:{type:Object,value:userPreference,readOnly:!0}}};BehaviorsStore.I18nBehavior={properties:{lang:{type:String,value:defaultLang$1,reflectToAttribute:!0,observer:"_langChanged"},text:{type:Object,computed:"_getBundle(lang)"},model:{type:Object,notify:!0},templateDefaultLang:{type:String,value:"en"},effectiveLang:{type:String},observeHtmlLang:{type:Boolean,value:!0,observer:"_observeHtmlLangChanged"}},listeners:{"lang-updated":"_updateEffectiveLang"},_getBundle:function(lang){var resolved,id="i18n-dom-bind"===this.is||"i18n-dom-bind"===this.constructor.is?this.id:this.is;if(lang&&0<lang.length){var fallbackLanguageList=this._enumerateFallbackLanguages(lang),tryLang;while(tryLang=fallbackLanguageList.shift()){if(!bundles[tryLang]){bundles[tryLang]={}}if(bundles[tryLang][id]){resolved=bundles[tryLang][id];break}}}else{lang="";resolved=bundles[lang][id]}if(!resolved){if(this._fetchStatus&&bundles[this._fetchStatus.lastLang]&&bundles[this._fetchStatus.lastLang][id]){resolved=bundles[this._fetchStatus.lastLang][id]}else if(defaultLang$1&&0<defaultLang$1.length&&bundles[defaultLang$1]&&bundles[defaultLang$1][id]){resolved=bundles[defaultLang$1][id]}else if(this.templateDefaultLang&&0<this.templateDefaultLang.length&&bundles[this.templateDefaultLang]&&bundles[this.templateDefaultLang][id]){resolved=bundles[this.templateDefaultLang][id]}else if(bundles[""][id]){resolved=bundles[""][id]}else{resolved={}}}return resolved},_enumerateFallbackLanguages:function(lang){var result=[],parts,match,isExtLangCode=0,extLangCode,isScriptCode=0,scriptCode,isCountryCode=0,countryCode,n;if(!lang||0===lang.length){result.push("")}else{parts=lang.split(/[-_]/);if(0<parts.length&&parts[0].match(/^[A-Za-z]{2,3}$/)){parts[0]=parts[0].toLowerCase()}if(2<=parts.length&&parts[1].match(/^[A-Za-z]{3}$/)&&!parts[1].match(/^[Cc][Hh][SsTt]$/)){isExtLangCode=1;extLangCode=parts[1]=parts[1].toLowerCase()}if(parts.length>=isExtLangCode+2&&(match=parts[isExtLangCode+1].match(/^([A-Za-z])([A-Za-z]{3})$/))){isScriptCode=1;scriptCode=parts[isExtLangCode+1]=match[1].toUpperCase()+match[2].toLowerCase()}if(parts.length>=isExtLangCode+isScriptCode+2&&(match=parts[isExtLangCode+isScriptCode+1].match(/^[A-Za-z0-9]{2,3}$/))){isCountryCode=1;countryCode=parts[isExtLangCode+isScriptCode+1]=match[0].toUpperCase()}if(parts.length>=isExtLangCode+isScriptCode+isCountryCode+2){for(n=isExtLangCode+isScriptCode+isCountryCode+1;n<parts.length;n++){parts[n]=parts[n].toLowerCase()}}while(0<parts.length){result.push(parts.join("-"));if(isScriptCode&&isCountryCode&&parts.length==isExtLangCode+isScriptCode+2){parts.splice(isExtLangCode+isScriptCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode+isScriptCode,0,scriptCode)}if(isExtLangCode&&isCountryCode&&parts.length==isExtLangCode+isScriptCode+2){parts.splice(isExtLangCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode,0,extLangCode)}if(isExtLangCode&&isScriptCode&&parts.length==isExtLangCode+isScriptCode+1){parts.splice(isExtLangCode,1);result.push(parts.join("-"));parts.splice(isExtLangCode,0,extLangCode)}if(!isScriptCode&&!isExtLangCode&&isCountryCode&&2==parts.length){switch(result[result.length-1]){case"zh-CN":case"zh-CHS":result.push("zh-Hans");break;case"zh-TW":case"zh-SG":case"zh-HK":case"zh-CHT":result.push("zh-Hant");break;default:break;}}parts.pop()}}return result},_handleLangAttributeChange:function(mutations){mutations.forEach(function(mutation){switch(mutation.type){case"attributes":if("lang"===mutation.attributeName){if(!("object"===typeof mutation.oldValue&&!mutation.oldValue)&&mutation.oldValue!==this.lang){if(this._lang!==mutation.oldValue){this._lang=mutation.oldValue}this._lang=this.lang}else if(mutation.oldValue!=this.lang&&this._lang!==this.lang){this._lang=this.lang}}break;default:break;}},this)},_langChanged:function(lang,oldLang){var id="i18n-dom-bind"===(this.is||this.getAttribute("is"))?this.id:this.is;lang=lang||"";oldLang=oldLang||"";if(lang!==oldLang&&bundles[oldLang]&&bundles[oldLang][id]){this._fetchStatus.lastLang=oldLang}if(bundles[lang]&&bundles[lang][id]){if(this._fetchStatus&&lang!==this._fetchStatus.ajaxLang){this._fetchStatus.error=null}if(this.__data){this.notifyPath("text",this._getBundle(this.lang))}this.effectiveLang=lang;this.fire("lang-updated",{lang:this.lang,oldLang:oldLang,lastLang:this._fetchStatus.lastLang})}else{this._fetchLanguage(lang)}},_fetchLanguage:function(lang){if(this._fetchStatus){this._fetchStatus.fallbackLanguageList=this._enumerateFallbackLanguages(lang);this._fetchStatus.fallbackLanguageList.push("");this._fetchStatus.targetLang=this._fetchStatus.fallbackLanguageList.shift();this._fetchBundle(this._fetchStatus.targetLang)}},_fetchBundle:function(lang){if(!lang||0===lang.length){if(defaultLang$1&&0<defaultLang$1.length){lang=defaultLang$1}else if(this.templateDefaultLang&&0<this.templateDefaultLang.length){lang=this.templateDefaultLang}else{lang=""}}bundles[lang]=bundles[lang]||{};var id="i18n-dom-bind"===this.is||"i18n-dom-bind"===this.constructor.is?this.id:this.is;if(bundles[lang][id]){if(this._fetchStatus.targetLang===lang){this._fetchStatus.error=null;if(this.lang===lang){this.notifyPath("text",this._getBundle(this.lang));this.fire("lang-updated",{lang:this.lang,lastLang:this._fetchStatus.lastLang})}else{this.lang=lang}}else{var nextFallbackLanguage=this._fetchStatus.fallbackLanguageList.shift();this._fetchStatus.fetchingInstance=null;if(nextFallbackLanguage){this._fetchBundle(nextFallbackLanguage)}else{this._constructBundle(this._fetchStatus.targetLang);this._fetchStatus.error=null;if(this.lang===this._fetchStatus.targetLang){this.notifyPath("text",this._getBundle(this.lang));this.fire("lang-updated",{lang:this.lang,lastLang:this._fetchStatus.lastLang})}else{this.lang=this._fetchStatus.targetLang}}}}else if(this._fetchStatus.fetchingInstance){if(this._fetchStatus.fetchingInstance!==this){this._forwardLangEventBindThis=this._forwardLangEventBindThis||this._forwardLangEvent.bind(this);this._fetchStatus.fetchingInstance.addEventListener("lang-updated",this._forwardLangEventBindThis)}}else if(bundleFetchingInstances[lang]){this._fetchStatus.fetchingInstance=this;this._fetchStatus.ajaxLang=lang;this._handleBundleFetchedBindThis=this._handleBundleFetchedBindThis||this._handleBundleFetched.bind(this);bundleFetchingInstances[lang].addEventListener("bundle-fetched",this._handleBundleFetchedBindThis)}else{this._fetchStatus.fetchingInstance=this;if(!this._fetchStatus.ajax){this._fetchStatus.ajax=document.createElement("iron-ajax");this._fetchStatus.ajax.handleAs="json";this._fetchStatus._handleResponseBindFetchingInstance=this._handleResponse.bind(this);this._fetchStatus._handleErrorBindFetchingInstance=this._handleError.bind(this);this._fetchStatus.ajax.addEventListener("response",this._fetchStatus._handleResponseBindFetchingInstance);this._fetchStatus.ajax.addEventListener("error",this._fetchStatus._handleErrorBindFetchingInstance)}else{if(this._fetchStatus._handleResponseBindFetchingInstance){this._fetchStatus.ajax.removeEventListener("response",this._fetchStatus._handleResponseBindFetchingInstance)}if(this._fetchStatus._handleErrorBindFetchingInstance){this._fetchStatus.ajax.removeEventListener("error",this._fetchStatus._handleErrorBindFetchingInstance)}this._fetchStatus._handleResponseBindFetchingInstance=this._handleResponse.bind(this);this._fetchStatus._handleErrorBindFetchingInstance=this._handleError.bind(this);this._fetchStatus.ajax.addEventListener("response",this._fetchStatus._handleResponseBindFetchingInstance);this._fetchStatus.ajax.addEventListener("error",this._fetchStatus._handleErrorBindFetchingInstance)}var url,skipFetching=!1,importBaseURI=this.constructor.importMeta?this.constructor.importMeta.url:location.href;if(""===lang){url=this.resolveUrl(id+".json",importBaseURI)}else{if(bundles[lang]&&bundles[lang].bundle){url=this.resolveUrl(localesPath+"/"+id+"."+lang+".json",importBaseURI);skipFetching=!!this.isI18nController}else{bundleFetchingInstances[lang]=this;url=this.resolveUrl(startUrl+localesPath+"/bundle."+lang+".json",importBaseURI)}}this._fetchStatus.ajax.url=url;this._fetchStatus.ajaxLang=lang;try{this._fetchStatus.error=null;if(skipFetching){this._handleError({detail:{error:"skip fetching for I18nController"}})}else{this._fetchStatus.ajax.generateRequest()}}catch(e){this._handleError({detail:{error:"ajax request failed: "+e}})}}},_handleResponse:function(event){if(0<=this._fetchStatus.ajax.url.indexOf("/"+localesPath+"/bundle.")){bundles[this._fetchStatus.ajaxLang]=bundles[this._fetchStatus.ajaxLang]||{};this._deepMap(bundles[this._fetchStatus.ajaxLang],event.detail.response,function(text){return text});bundles[this._fetchStatus.ajaxLang].bundle=!0;bundleFetchingInstances[this._fetchStatus.ajaxLang]=null;this.fire("bundle-fetched",{success:!0,lang:this._fetchStatus.ajaxLang});var id="i18n-dom-bind"===this.is?this.id:this.is;if(bundles[this._fetchStatus.ajaxLang][id]){this._fetchStatus.lastResponse=bundles[this._fetchStatus.ajaxLang][id]}else{this._fetchStatus.fetchingInstance=null;this._fetchBundle(this._fetchStatus.ajaxLang);return}}else{this._fetchStatus.lastResponse=event.detail.response}if(this._fetchStatus.lastResponse){var nextFallbackLanguage=this._fetchStatus.fallbackLanguageList.shift();this._fetchStatus.rawResponses[this._fetchStatus.ajaxLang]=this._fetchStatus.lastResponse;this._fetchStatus.fetchingInstance=null;if(nextFallbackLanguage){this._fetchBundle(nextFallbackLanguage)}else{this._fetchBundle("")}}else{event.detail.error="empty response for "+this._fetchStatus.ajax.url;this._handleError(event)}},_handleError:function(event){var nextFallbackLanguage;this._fetchStatus.fetchingInstance=null;if(0<=this._fetchStatus.ajax.url.indexOf("/"+localesPath+"/bundle.")){bundles[this._fetchStatus.ajaxLang]=bundles[this._fetchStatus.ajaxLang]||{};bundles[this._fetchStatus.ajaxLang].bundle=!0;bundleFetchingInstances[this._fetchStatus.ajaxLang]=null;this._fetchBundle(this._fetchStatus.ajaxLang);this.fire("bundle-fetched",{success:!1,lang:this._fetchStatus.ajaxLang});return}nextFallbackLanguage=this._fetchStatus.fallbackLanguageList.shift();if(this._fetchStatus.ajaxLang===this._fetchStatus.targetLang){if(nextFallbackLanguage){this._fetchStatus.targetLang=nextFallbackLanguage;this._fetchBundle(nextFallbackLanguage)}else{this._fetchStatus.error=event.detail.error;this.lang=""}}else{if(nextFallbackLanguage){this._fetchBundle(nextFallbackLanguage)}else{this._fetchBundle("")}}},_forwardLangEvent:function(event){event.target.removeEventListener(event.type,this._forwardLangEventBindThis);if(this.lang===event.detail.lang){this.notifyPath("text",this._getBundle(this.lang));this.fire(event.type,event.detail)}else{this.lang=event.detail.lang;this.notifyPath("text",this._getBundle(this.lang))}},_handleBundleFetched:function(event){var detail=event.detail;event.target.removeEventListener(event.type,this._handleBundleFetchedBindThis);if(this._fetchStatus.ajaxLang===detail.lang){this._fetchStatus.fetchingInstance=null;this._fetchBundle(this._fetchStatus.ajaxLang)}},_observeHtmlLangChanged:function(value){if(value){this._htmlLangObserver=this._htmlLangObserver||new MutationObserver(this._handleHtmlLangChange.bind(this));this._htmlLangObserver.observe(html$2,{attributes:!0})}else{if(this._htmlLangObserver){this._htmlLangObserver.disconnect()}}},_handleHtmlLangChange:function(mutations){mutations.forEach(function(mutation){switch(mutation.type){case"attributes":if("lang"===mutation.attributeName){this.lang=html$2.lang}break;default:break;}},this)},_constructBundle:function(lang){var fallbackLanguageList=this._enumerateFallbackLanguages(lang),bundle={},raw,baseLang,id="i18n-dom-bind"===this.is?this.id:this.is,i;fallbackLanguageList.push("");for(i=0;i<fallbackLanguageList.length;i++){if(bundles[fallbackLanguageList[i]]&&bundles[fallbackLanguageList[i]][id]){break}}fallbackLanguageList.splice(i+1,fallbackLanguageList.length);while((baseLang=fallbackLanguageList.pop())!==void 0){if(bundles[baseLang][id]){bundle=deepcopy(bundles[baseLang][id])}else{raw=this._fetchStatus.rawResponses[baseLang];if(raw){this._deepMap(bundle,raw,function(text){return text})}}}if(!bundles[lang]){bundles[lang]={}}bundles[lang][id]=bundle},_deepMap:function(target,source,map){var value;for(var prop in source){value=source[prop];switch(typeof value){case"string":case"number":case"boolean":if("object"===typeof target){target[prop]=map(value,prop)}break;case"object":if("object"===typeof target){if(Array.isArray(value)){target[prop]=target[prop]||[];this._deepMap(target[prop],value,map)}else{target[prop]=target[prop]||{};this._deepMap(target[prop],value,map)}}break;default:if("object"===typeof target){target[prop]=value}break;}}},_constructDefaultBundle:function(_template,_id){var template,id=_id||this.is;if("i18n-dom-bind"===this.is){template=_template||this;id=this.id;if(template.content&&0===template.content.childNodes.length){template=Array.prototype.map.call(document.querySelectorAll("template"),function(parentTemplate){return parentTemplate.content.querySelector("template#"+id+"[is=\"i18n-dom-bind\"]")}).reduce(function(prev,current){return prev||current});if(template){this.content=template.content}}}else{template=_template||DomModule.import(id,"template")}if(template){this.templateDefaultLang=template.hasAttribute("lang")?template.lang:"en"}else{this.templateDefaultLang="en"}var bundle={model:{}},path=[],templateDefaultLang=this.templateDefaultLang,localizableText,jsonData;if(template){if(attributesRepository.registerLocalizableAttributes){attributesRepository.registerLocalizableAttributes(id,template)}else{BehaviorsStore._I18nAttrRepo._created();BehaviorsStore._I18nAttrRepo.registerLocalizableAttributes(id,template)}if("embedded"===template.getAttribute("localizable-text")){localizableText=template.content.querySelector("#localizable-text");if(localizableText){jsonData=localizableText.content.querySelector("json-data");if(jsonData){bundle=JSON.parse(jsonData.textContent)}else{console.error("<json-data> not found in <template id=\"localizable-text\">")}}else{console.error("<template id=\"localizable-text\"> not found")}}else{this._traverseTemplateTree(template.content,path,bundle,0)}}bundles[""][id]=bundle;bundles[templateDefaultLang]=bundles[templateDefaultLang]||{};bundles[templateDefaultLang][id]=bundle;return!0},_traverseAttributes:function(node,path,bundle){var name=node.nodeName.toLowerCase(),id=node.getAttribute?node.getAttribute("text-id")||node.getAttribute("id"):null,text,messageId,attrId,isLocalizable,dummy;Array.prototype.forEach.call(node.attributes,function(attribute){text=attribute.value;switch(attribute.name){case"id":case"text-id":case"is":case"lang":case"class":case"href":case"src":case"style":case"url":case"selected":break;default:if(!(isLocalizable=BehaviorsStore._I18nAttrRepo.isLocalizableAttribute(node,attribute.name))){break}if(0===text.length){}else if(text.match(/^{{[^{}]*}}$/)||text.match(/^\[\[[^\[\]]*\]\]$/)){}else if(text.replace(/\n/g," ").match(/^{.*}|\[.*\]$/g)&&!text.match(/^{{[^{}]*}}|\[\[[^\[\]]*\]\]/)&&!text.match(/{{[^{}]*}}|\[\[[^\[\]]*\]\]$/)){messageId=this._generateMessageId(path,id);try{var value=JSON.parse(text.replace(/\n/g," "));switch(typeof value){case"string":case"number":case"object":attrId=["model",messageId,attribute.name].join(".");debuglog(attrId+" = "+text);this._setBundleValue(bundle,attrId,value);attribute.value="{{"+attrId+"}}";break;default:break;}}catch(e){console.warn(e,"Invalid JSON at <"+name+" "+attribute.name+"> with value = "+text)}}else if(text.match(/{{[^{}]{1,}}}|\[\[[^\[\]]{1,}\]\]/)){var parsed=text.match(/([^{}\[\]]{1,})|({{[^{}]{1,}}})|(\[\[[^\[\]]{1,}\]\])/g),parameterized,processed,n;messageId=this._generateMessageId(path,id);attrId=["model",messageId,attribute.name.replace(/\$$/,"")].join(".");if(text.match(/\)}}|\)\]\]/)){debuglog(attrId+" = "+JSON.stringify(parsed));this._setBundleValue(bundle,attrId,parsed);processed="";for(n=0;n<parsed.length;n++){if(parsed[n].match(/^{{[^{}]{1,}}}|\[\[[^\[\]]{1,}\]\]$/)){processed+=parsed[n]}else{processed+="{{"+attrId+"."+n+"}}"}}if("$"===isLocalizable&&!attribute.name.match(/\$$/)){dummy=document.createElement("span");dummy.innerHTML="<span "+attribute.name+"$=\""+processed+"\"></span>";node.setAttributeNode(dummy.childNodes[0].attributes[0].cloneNode())}else{attribute.value=processed}}else{parameterized=[""];while(parsed.length){if(parsed[0].match(/^{{[^{}]{1,}}}|\[\[[^\[\]]{1,}\]\]$/)){parameterized.push(parsed[0]);parameterized[0]+="{"+(parameterized.length-1)+"}"}else{parameterized[0]+=parsed[0]}parsed.shift()}debuglog(attrId+" = "+JSON.stringify(parameterized));this._setBundleValue(bundle,attrId,parameterized);processed="{{i18nFormat("+attrId+".0";for(n=1;n<parameterized.length;n++){processed+=","+parameterized[n].replace(/^[{\[][{\[](.*)[}\]][}\]]$/,"$1")}processed+=")}}";if("$"===isLocalizable&&!attribute.name.match(/\$$/)){dummy=document.createElement("span");dummy.innerHTML="<span "+attribute.name+"$=\""+processed+"\"></span>";node.setAttributeNode(dummy.childNodes[0].attributes[0].cloneNode())}else{attribute.value=processed}}}else{messageId=this._generateMessageId(path,id);attrId=["model",messageId,attribute.name].join(".");debuglog(attrId+" = "+text);this._setBundleValue(bundle,attrId,text);if("$"===isLocalizable&&!attribute.name.match(/\$$/)){dummy=document.createElement("span");dummy.innerHTML="<span "+attribute.name+"$="+"\"{{"+attrId+"}}\""+"></span>";node.setAttributeNode(dummy.childNodes[0].attributes[0].cloneNode())}else{attribute.value="{{"+attrId+"}}"}}break;}},this)},_traverseTemplateTree:function(node,path,bundle,index){var i,whiteSpaceElements=0,isWhiteSpace=!1,isCompoundAnnotatedNode=!1,text,span,name=node.nodeName.toLowerCase(),id=node.getAttribute?node.getAttribute("text-id")||node.getAttribute("id"):null,messageId,n,templateText,templateTextParams;path.push(id?"#"+id:name+(0<index?"_"+index:""));switch(node.nodeType){case node.ELEMENT_NODE:switch(name){case"style":case"script":case"meta":break;case"i18n-format":this._traverseAttributes(node,path,bundle);messageId=this._generateMessageId(path,id);if(!node.hasAttribute("lang")){node.setAttribute("lang","{{effectiveLang}}")}text=Array.prototype.filter.call(node.childNodes,function(child){return child.nodeType===child.ELEMENT_NODE}).map(function(param,n){var value=param.textContent,parsedValue=value.match(/^({{)(.*)(}})$/)||value.match(/^(\[\[)(.*)(\]\])$/);if(0===n){if("json-data"===param.tagName.toLowerCase()){if(parsedValue){var parsedValue2=value.match(/^({{)(serialize\(.*\))(}})$/)||value.match(/^(\[\[)(serialize\(.*\))(\]\])$/);if(!parsedValue2){parsedValue.shift();parsedValue.splice(1,0,"serialize(");parsedValue.splice(3,0,")");param.textContent=parsedValue.join("")}}else{value=JSON.parse(value);param.textContent="{{serialize(text."+messageId+"."+n+")}}"}}else{if(!parsedValue){param.textContent="{{text."+messageId+"."+n+"}}"}}}else{if(!param.hasAttribute(paramAttribute)){param.setAttribute(paramAttribute,n)}if("i18n-number"===param.tagName.toLowerCase()){if(!param.hasAttribute("lang")){param.setAttribute("lang","{{effectiveLang}}")}var offset=param.getAttribute("offset");if(offset){offset=" - "+offset}else{offset=""}if(parsedValue){parsedValue.shift();parsedValue.splice(2,0,offset);value=parsedValue.join("")}else{param.textContent="{{text."+messageId+"."+n+"}}"}}else{if(!parsedValue){param.textContent="{{text."+messageId+"."+n+"}}"}}}return value},this);debuglog(messageId+" = "+text);this._setBundleValue(bundle,messageId,text);break;case"template":this._traverseTemplateTree(node.content,path,bundle,0);break;default:if("i18n-number"===name||"i18n-datetime"===name){if(!node.hasAttribute("lang")){node.setAttribute("lang","{{effectiveLang}}")}}this._traverseAttributes(node,path,bundle);isCompoundAnnotatedNode=!1;if(0===node.childElementCount){if(node.textContent){isCompoundAnnotatedNode=this._isCompoundAnnotatedText(node.textContent)}}if(0===node.childElementCount&&!isCompoundAnnotatedNode){if(node.textContent){text=node.textContent;if(0===text.length||text.match(/^\s*$/g)){}else if(text.trim().match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)){}else{messageId=this._generateMessageId(path,id);text=text.replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," ");if("json-data"===name){this._setBundleValue(bundle,messageId,JSON.parse(text))}else{this._setBundleValue(bundle,messageId,text)}node.textContent="{{text."+messageId+"}}";if(!id){}debuglog(messageId+" = "+text)}}else{}}else{var childStatus=Array.prototype.map.call(node.childNodes,function(child){var result;if(child.nodeType===child.ELEMENT_NODE&&"TEMPLATE"===child.tagName){var templateNonCommentChildNodes=Array.prototype.filter.call(child.content.childNodes,function(templateChild){switch(templateChild.nodeType){case templateChild.COMMENT_NODE:return!1;case templateChild.TEXT_NODE:return!templateChild.textContent.match(/^\s*$/g);default:case templateChild.ELEMENT_NODE:return!0;}}),firstChild=templateNonCommentChildNodes.shift();result={hasText:0===templateNonCommentChildNodes.length&&firstChild&&firstChild.nodeType===firstChild.TEXT_NODE&&0<firstChild.textContent.length&&!firstChild.textContent.match(/^\s*$/g),hasCompoundAnnotatedText:firstChild&&firstChild.nodeType===firstChild.TEXT_NODE&&this._isCompoundAnnotatedText(firstChild.textContent),hasTextChild:0===templateNonCommentChildNodes.length&&firstChild&&firstChild.nodeType===child.ELEMENT_NODE&&0===firstChild.childElementCount,hasCompoundAnnotatedChildNode:firstChild&&firstChild.nodeType===firstChild.ELEMENT_NODE&&0===firstChild.childElementCount&&this._isCompoundAnnotatedText(firstChild.textContent),hasGrandChildren:0<templateNonCommentChildNodes.length||firstChild&&firstChild.nodeType===firstChild.ELEMENT_NODE&&Array.prototype.map.call(firstChild.childNodes,function(grandChild){return grandChild.nodeType!==grandChild.TEXT_NODE}).reduce(function(prev,current){return prev||current},!1)||firstChild&&firstChild.nodeType===firstChild.TEXT_NODE&&this._isCompoundAnnotatedText(firstChild.textContent)}}else{result={hasText:child.nodeType===child.TEXT_NODE&&0<child.textContent.length&&!child.textContent.match(/^\s*$/g),hasCompoundAnnotatedText:child.nodeType===child.TEXT_NODE&&this._isCompoundAnnotatedText(child.textContent),hasTextChild:child.nodeType===child.ELEMENT_NODE&&0===child.childElementCount,hasCompoundAnnotatedChildNode:child.nodeType===child.ELEMENT_NODE&&0===child.childElementCount&&this._isCompoundAnnotatedText(child.textContent),hasGrandChildren:child.nodeType===child.ELEMENT_NODE&&Array.prototype.map.call(child.childNodes,function(grandChild){return grandChild.nodeType!==grandChild.TEXT_NODE}).reduce(function(prev,current){return prev||current},!1)}}return result}.bind(this)).reduce(function(prev,current){return{hasText:prev.hasText||current.hasText,hasCompoundAnnotatedText:prev.hasCompoundAnnotatedText||current.hasCompoundAnnotatedText,hasTextChild:prev.hasTextChild||current.hasTextChild,hasCompoundAnnotatedChildNode:prev.hasCompoundAnnotatedChildNode||current.hasCompoundAnnotatedChildNode,hasGrandChildren:prev.hasGrandChildren||current.hasGrandChildren}},{hasText:!1,hasCompoundAnnotatedText:!1,hasTextChild:!1,hasCompoundAnnotatedChildNode:!1,hasGrandChildren:!1});if((childStatus.hasText||node.hasAttribute("text-id"))&&(childStatus.hasTextChild||childStatus.hasCompoundAnnotatedText)&&!childStatus.hasGrandChildren&&!childStatus.hasCompoundAnnotatedChildNode){n=0;messageId=this._generateMessageId(path,id);templateTextParams=Array.prototype.map.call(node.childNodes,function(child){var firstChild;if(child.nodeType===child.TEXT_NODE&&this._hasAnnotatedText(child.textContent)){return this._compoundAnnotationToSpan(child).map(function(_child){return{node:_child,templateNode:null,type:_child.nodeType,text:_child.nodeType===_child.TEXT_NODE?_child.textContent:null,childTextNode:_child.nodeType===_child.ELEMENT_NODE&&0<_child.childNodes.length}})}else if(child.nodeType===child.ELEMENT_NODE&&"TEMPLATE"===child.tagName){firstChild=Array.prototype.filter.call(child.content.childNodes,function(templateChild){switch(templateChild.nodeType){case templateChild.COMMENT_NODE:return!1;case templateChild.TEXT_NODE:return!templateChild.textContent.match(/^\s*$/g);default:case templateChild.ELEMENT_NODE:return!0;}}).shift();if(!firstChild){firstChild=Array.prototype.filter.call(child.content.childNodes,function(templateChild){switch(templateChild.nodeType){case templateChild.COMMENT_NODE:return!1;default:return!0;}}).shift()}if(firstChild){return[{node:firstChild,templateNode:child,type:firstChild.nodeType,text:null,childTextNode:!0}]}else{return[]}}else{return[{node:child,templateNode:null,type:child.nodeType,text:child.nodeType===child.TEXT_NODE?child.textContent:null,childTextNode:child.nodeType===child.ELEMENT_NODE&&0<child.childNodes.length}]}}.bind(this)).reduce(function(prev,currentList){for(var current,textContent,i=0;i<currentList.length;i++){current=currentList[i];if(current.text){prev.text[0]+=current.text}if(current.type===current.node.ELEMENT_NODE){n++;prev.text[0]+="{"+n+"}";path.push(n);this._traverseAttributes(current.node,path,bundle);path.pop();if(current.childTextNode){textContent=current.node.textContent;if(0===textContent.length){prev.text.push("<"+current.node.nodeName.toLowerCase()+">");current.node.textContent=""}else if(textContent.match(/^\s*$/g)){prev.text.push("<"+current.node.nodeName.toLowerCase()+">");current.node.textContent=" "}else if(textContent.match(/^[\s]*({{.*}}|\[\[.*\]\])[\s]*$/)){prev.text.push(textContent)}else{prev.text.push(current.node.textContent.replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," "));current.node.textContent="{{text."+messageId+"."+n+"}}"}}else{prev.text.push("<"+current.node.nodeName.toLowerCase()+">")}current.node.setAttribute(paramAttribute,n.toString());prev.params.push(current.templateNode||current.node)}else if(current.type===current.node.TEXT_NODE&&current.childTextNode){n++;prev.text[0]+="{"+n+"}";textContent=current.node.textContent;if(0===textContent.length){prev.text.push("<template>");current.node.textContent=""}else if(textContent.match(/^\s*$/g)){prev.text.push("<template>");current.node.textContent=" "}else if(textContent.match(/^[\s]*({{.*}}|\[\[.*\]\])[\s]*$/)){prev.text.push(textContent)}else{prev.text.push(textContent.replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," "));current.node.textContent="{{text."+messageId+"."+n+"}}"}span=document.createElement("span");span.setAttribute(paramAttribute,n.toString());current.templateNode.content.removeChild(current.node);span.appendChild(current.node);current.templateNode.content.appendChild(span);prev.params.push(current.templateNode)}}return prev}.bind(this),{text:[""],params:["{{text."+messageId+".0}}"]});node.innerHTML="";templateText=document.createElement("i18n-format");templateText.setAttribute("lang","{{effectiveLang}}");node.appendChild(templateText);span=document.createElement("span");span.textContent=templateTextParams.params.shift();templateText.appendChild(span);Array.prototype.forEach.call(templateTextParams.params,function(param){templateText.appendChild(param)});templateTextParams.text[0]=templateTextParams.text[0].replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," ");this._setBundleValue(bundle,messageId,templateTextParams.text);if(!id){}debuglog(messageId+" = "+templateTextParams.text)}else{for(i=0;i<node.childNodes.length;i++){if(this._traverseTemplateTree(node.childNodes[i],path,bundle,i-whiteSpaceElements)){whiteSpaceElements++}}}}break;}break;case node.TEXT_NODE:text=node.textContent;if(0===text.length||text.match(/^\s*$/g)){isWhiteSpace=!0}else if(text.trim().match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)){}else{var parent=node.parentNode;if(this._isCompoundAnnotatedText(text)){n=0;messageId=this._generateMessageId(path,id);templateTextParams=Array.prototype.map.call([node],function(child){return this._compoundAnnotationToSpan(child).map(function(_child){return{node:_child,type:_child.nodeType,text:_child.nodeType===_child.TEXT_NODE?_child.textContent:null,childTextNode:_child.nodeType===_child.ELEMENT_NODE&&0<_child.childNodes.length}})}.bind(this)).reduce(function(prev,currentList){for(var current,i=0;i<currentList.length;i++){current=currentList[i];if(current.text){prev.text[0]+=current.text}if(current.type===current.node.ELEMENT_NODE){n++;prev.text[0]+="{"+n+"}";path.push(n);this._traverseAttributes(current.node,path,bundle);path.pop();prev.text.push(current.node.textContent);current.node.setAttribute(paramAttribute,n.toString());prev.params.push(current.node)}}return prev}.bind(this),{text:[""],params:["{{text."+messageId+".0}}"]});templateText=document.createElement("i18n-format");templateText.setAttribute("lang","{{effectiveLang}}");parent.insertBefore(templateText,node);parent.removeChild(node);span=document.createElement("span");span.textContent=templateTextParams.params.shift();templateText.appendChild(span);Array.prototype.forEach.call(templateTextParams.params,function(param){templateText.appendChild(param)});templateTextParams.text[0]=templateTextParams.text[0].replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," ");this._setBundleValue(bundle,messageId,templateTextParams.text);debuglog(messageId+" = "+templateTextParams.text)}else{messageId=this._generateMessageId(path,id);text=text.replace(/^[\s]*[\s]/," ").replace(/[\s][\s]*$/," ");this._setBundleValue(bundle,messageId,text);node.textContent="{{text."+messageId+"}}";if(!id){}debuglog(messageId+" = "+text)}}break;case node.DOCUMENT_NODE:case node.DOCUMENT_FRAGMENT_NODE:for(i=0;i<node.childNodes.length;i++){if(this._traverseTemplateTree(node.childNodes[i],path,bundle,i-whiteSpaceElements)){whiteSpaceElements++}}break;default:isWhiteSpace=!0;break;}path.pop();return isWhiteSpace},_isCompoundAnnotatedText:function(text){return!text.trim().match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)&&!!text.match(/({{[^{}]*}}|\[\[[^\[\]]*\]\])/)},_hasAnnotatedText:function(text){return!!text.match(/({{[^{}]*}}|\[\[[^\[\]]*\]\])/)},_compoundAnnotationToSpan:function(node){var result;if(node.textContent.match(/({{[^{}]*}}|\[\[[^\[\]]*\]\])/)){result=node.textContent.match(/({{[^{}]*}}|\[\[[^\[\]]*\]\]|[^{}\[\]]{1,}|[{}\[\]]{1,})/g).reduce(function(prev,current){if(current.match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)){prev.push(current);prev.push("")}else{if(0===prev.length){prev.push(current)}else{prev[prev.length-1]+=current}}return prev}.bind(this),[]).map(function(item){var childNode;if(item.match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)){childNode=document.createElement("span");childNode.textContent=item}else if(item){childNode=document.createTextNode(item)}else{childNode=null}return childNode});if(0<result.length){if(!result[result.length-1]){result.pop()}}}else{result=[node]}return result},_setBundleValue:function(bundle,messageId,value){var messageIdPath=messageId.split(".");bundle.model=bundle.model||{};if(1===messageIdPath.length){bundle[messageId]=value}else{for(var cursor=bundle,i=0;i<messageIdPath.length;i++){if(i<messageIdPath.length-1){cursor[messageIdPath[i]]=cursor[messageIdPath[i]]||{};cursor=cursor[messageIdPath[i]]}else{cursor[messageIdPath[i]]=value}}}},_generateMessageId:function(path,id){var messageId;if(!id||0===id.length){for(var i=1;i<path.length;i++){if("#"===path[i][0]){if("#document-fragment"!==path[i]){if(messageId&&"#text"===path[i].substr(0,5)){messageId+=":"+path[i].substr(1)}else{messageId=path[i].substr(1)}}}else{if(messageId){messageId+=":"+path[i]}else{messageId=path[i]}}}}else{messageId=id}return messageId},or:function(){var result=arguments[0],i=1;while(!result&&i<arguments.length){result=arguments[i++]}return result},tr:function(key,table){if(table){if("object"===typeof table){if("undefined"!==typeof table[key]){return table[key]}else if("undefined"!==typeof table["default"]){return table["default"]}else{return key}}else{return key}}else{return"object"===typeof this.text&&"undefined"!==typeof key&&"undefined"!==typeof this.text[key]?this.text[key]:key}},i18nFormat:function(){if(0<arguments.length){for(var formatted=arguments[0]||"",n=1;n<arguments.length;n++){formatted=formatted.replace("{"+n+"}",arguments[n])}}return formatted},beforeRegister:function(){return},registered:function(){if("i18n-dom-bind"!==this.is){var template=this._template||DomModule.import(this.is,"template");if(!template){var id=this.is;template=document.querySelector("template[id="+id+"]");if(!template){template=document.createElement("template");template.setAttribute("id",id)}if(template){var domModule=document.createElement("dom-module"),_noTemplateDomModule=DomModule.import(this.is),assetpath=_noTemplateDomModule?_noTemplateDomModule.assetpath:new URL(document.baseURI).pathname;domModule.appendChild(template);domModule.setAttribute("assetpath",template.hasAttribute("basepath")?template.getAttribute("basepath"):template.hasAttribute("assetpath")?template.getAttribute("assetpath"):assetpath);domModule.register(id);this._template=template}var bundle={model:{}};bundles[""][id]=bundle;bundles[defaultLang$1]=bundles[defaultLang$1]||{};bundles[defaultLang$1][id]=bundle;console.warn("I18nBehavior.registered: "+id+" has no template. Supplying an empty template")}this._fetchStatus=deepcopy({fetchingInstance:null,ajax:null,ajaxLang:null,lastLang:null,fallbackLanguageList:null,targetLang:null,lastResponse:{},rawResponses:{}})}},created:function(){if("i18n-dom-bind"===this.is){this._propertyEffects=deepcopy(this._propertyEffects)}else{var template=DomModule.import(this.is,"template");if(template&&template.hasAttribute("lang")){this.templateDefaultLang=template.getAttribute("lang")||""}if(!this._fetchStatus){this._fetchStatus=deepcopy({fetchingInstance:null,ajax:null,ajaxLang:null,lastLang:null,fallbackLanguageList:null,targetLang:null,lastResponse:{},rawResponses:{}})}}this.observer=new MutationObserver(this._handleLangAttributeChange.bind(this));this.observer.observe(this,{attributes:!0,attributeFilter:["lang"],attributeOldValue:!0})},ready:function(){if("i18n-dom-bind"===this.is){if(!this._templateLocalizable){this._templateLocalizable=this._constructDefaultBundle()}if(!this._fetchStatus){this._fetchStatus=deepcopy({fetchingInstance:null,ajax:null,ajaxLang:null,lastLang:null,fallbackLanguageList:null,targetLang:null,lastResponse:{},rawResponses:{}})}this._onDomChangeBindThis=this._onDomChange.bind(this);this.addEventListener("dom-change",this._onDomChangeBindThis);this.__data__=this.__data__||Object.create(null)}else{if(!this.__data){this._initializeProperties()}this._langChanged(this.getAttribute("lang"),void 0);if(this.text){this.model=deepcopy(this.text.model)}}},attached:function(){if(this.observeHtmlLang){this.lang=html$2.lang;this._observeHtmlLangChanged(!0)}},_onDomChange:function(){this.removeEventListener("dom-change",this._onDomChangeBindThis);if(this.text&&this.text.model){this.model=deepcopy(this.text.model)}if(this.observeHtmlLang){this.lang=html$2.lang;this._observeHtmlLangChanged(!0)}},detached:function(){if(this.observeHtmlLang){this._observeHtmlLangChanged(!1)}}};var _properties=Object.create(null);for(var p$2 in BehaviorsStore.I18nBehavior.properties){if("lang"===p$2){_properties._lang=BehaviorsStore.I18nBehavior.properties.lang}else{_properties[p$2]=BehaviorsStore.I18nBehavior.properties[p$2]}}BehaviorsStore.I18nBehavior.properties=_properties;BehaviorsStore.I18nBehavior.properties._lang.reflectToAttribute=!1;BehaviorsStore.I18nBehavior.properties.text.computed="_getBundle(_lang)";BehaviorsStore.I18nBehavior._updateEffectiveLang=function(event){if(event.composedPath()[0]===this){this.effectiveLang=this._lang}};BehaviorsStore.I18nBehavior.hostAttributes={lang:defaultLang$1};BehaviorsStore._I18nBehavior=BehaviorsStore.I18nBehavior;BehaviorsStore.I18nBehavior=[BehaviorsStore._I18nBehavior];BehaviorsStore.I18nBehavior.push({get _template(){if(this.__template){return this.__template}if(this instanceof HTMLElement&&"PolymerGenerated"===(this.constructor.name||this.constructor.toString().replace(/^function ([^ \(]*)((.*|[\n]*)*)$/,"$1"))&&!this.constructor.__finalizeClass){this.constructor.__finalizeClass=this.constructor._finalizeClass;let This=this;this.constructor._finalizeClass=function _finalizeClass(){let info=this.generatedFrom;if(!this._templateLocalizable){let template=DomModule.import(info.is,"template");if(info._template){if(!template){let m=document.createElement("dom-module");m.appendChild(info._template);m.register(info.is)}this._templateLocalizable=BehaviorsStore._I18nBehavior._constructDefaultBundle(This.__template=info._template,info.is)}else{if(template){this._templateLocalizable=BehaviorsStore._I18nBehavior._constructDefaultBundle(This.__template=template,info.is)}}}return this.__finalizeClass()}}return this.__template},set _template(value){this.__template=value}});if(!function F(){}.name){BehaviorsStore.I18nBehavior.push(MutableDataBehavior)}Object.defineProperty(BehaviorsStore.I18nBehavior,"0",{get:function(){var ownerDocument=document,i18nAttrRepos=ownerDocument.querySelectorAll("i18n-attr-repo:not([processed])"),domModules=ownerDocument.querySelectorAll("dom-module[legacy]");if(0===domModules.length){domModules=ownerDocument.querySelectorAll("dom-module");if(1!==domModules.length){domModules=[]}}BehaviorsStore._I18nAttrRepo._created();Array.prototype.forEach.call(i18nAttrRepos,function(repo){if(!repo.hasAttribute("processed")){var customAttributes=repo.querySelector("template#custom");if(customAttributes){BehaviorsStore._I18nAttrRepo._traverseTemplateTree(customAttributes.content||customAttributes._content)}repo.setAttribute("processed","")}});Array.prototype.forEach.call(domModules,function(domModule){if(domModule&&domModule.id){var template=domModule.querySelector("template");if(template){BehaviorsStore._I18nBehavior._constructDefaultBundle(template,domModule.id);domModule.removeAttribute("legacy")}}});return BehaviorsStore._I18nBehavior}});window.BaseElements=window.BaseElements||{};window.Mixins=window.Mixins||{};Mixins.Localizable=function(base){return class Localizable extends mixinBehaviors([BehaviorsStore._I18nBehavior],base){constructor(){super()}get _template(){return this._cachedTemplate}set _template(template){if(template){Localizable._renameTemplate(this.constructor)}this._cachedTemplate=template}static _renameTemplate(target){let desc=Object.getOwnPropertyDescriptor(target,"template");if(desc){Object.defineProperty(target,"_rawTemplate",desc);delete target.template}}static get _rawTemplate(){let id=this.is,name=this.name||("function"===typeof this?this.toString().replace(/^[\S\s]*?function\s*/,"").replace(/[\s\(\/][\S\s]+$/,""):void 0);if(!id&&name&&"Localizable"!==name&&"class"!=name&&!name.match(/^_class/)){id=this.is=this._uncamelCase(name)}let template=DomModule.import(id,"template");if(id&&!template){let current=null,ownerDocument=document,baseURI=this.importMeta?this.importMeta.url:ownerDocument.baseURI;template=ownerDocument.querySelector("template[id="+id+"]")||document.querySelector("template[id="+id+"]");if(!template&&"i18n-dom-bind"!==id){template=document.createElement("template");template.setAttribute("id",id);console.warn("Localizable._rawTemplate: "+id+" has no template. Supplying an empty template")}if(template){let domModule=document.createElement("dom-module"),assetpath="function"===typeof URL&&"URL"===URL.name?new URL(baseURI||document.baseURI).pathname:(uri=>{let a=document.createElement("a");a.href=uri;return("/"+a.pathname).replace(/^\/\//,"/")})(baseURI);domModule.appendChild(template);domModule.setAttribute("assetpath",template.hasAttribute("basepath")?template.getAttribute("basepath"):template.hasAttribute("assetpath")?template.getAttribute("assetpath"):assetpath);domModule.register(id);this._template=template}}return template}static get template(){return this._i18nPreprocess(this._rawTemplate)}static _uncamelCase(name){return name.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z0-9])/,"$1 $2$3").replace(/ /g,"-").toLowerCase()}static get _templateLocalizable(){return this.hasOwnProperty("__templateLocalizable")}static set _templateLocalizable(value){this.__templateLocalizable=value}static _i18nPreprocess(template){if(this.is&&template&&!this._templateLocalizable){Object.defineProperty(this.prototype,"templateDefaultLang",{configurable:!1,enumerable:!0,value:"en",writable:!0});this._templateLocalizable=this.prototype._constructDefaultBundle(template)}return template}get is(){return this.constructor.is}connectedCallback(){super.connectedCallback()}}};Mixins.Logger=base=>class extends base{connectedCallback(){super.connectedCallback();console.log("<"+Object.getPrototypeOf(this).constructor.is+">: "+"id = "+this.id+", "+"this.text = "+JSON.stringify(this.text,null,2));console.log("Preprocessed template = \n",Object.getPrototypeOf(this).constructor.template)}};Object.defineProperty(BaseElements,"I18nElement",{get:function(){return Mixins.Localizable(LegacyElementMixin(HTMLElement))}});class I18nDomBind extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return{url:new URL(BehaviorsStore.I18nControllerBehavior.properties.startUrl.value,location.href).href}}static get is(){return"i18n-dom-bind"}connectedCallback(){this._fetchStatus=deepcopy({fetchingInstance:null,ajax:null,ajaxLang:null,lastLang:null,fallbackLanguageList:null,targetLang:null,lastResponse:{},rawResponses:{}});this.render()}disconnectedCallback(){this._removeChildren()}_insertChildren(){if(this._children){for(var i=0;i<this._children.length;i++){this.parentNode.insertBefore(this._children[i],this)}}}_removeChildren(){if(this._children){for(var i=0;i<this._children.length;i++){this.stamped.appendChild(this._children[i])}}}render(){if(!this._children){var template=this.querySelector("template");if(!template){throw new Error("i18n-dom-bind requires a <template> child")}this._templateLocalizable=this._constructDefaultBundle(template);this._bindTemplate(template);this.root=this._stampTemplate(template);this.stamped=this.root;this._children=[];for(var n=this.root.firstChild;n;n=n.nextSibling){this._children[this._children.length]=n}if("function"===typeof this._enableProperties){this._enableProperties(this)}}this._insertChildren();this.dispatchEvent(new CustomEvent("dom-change"))}}customElements.define(I18nDomBind.is,I18nDomBind);"use strict";var fakeServerContents$1={"/commented-simple-text-element/commented-simple-text-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"third-level-div\": \"great grandchild text within div\",\n  \"second-level-div:div_1\": \"great grandchild text within div without id\",\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items:li\": \"line item with id 1\",\n  \"line-items:li_1\": \"line item with id 2\",\n  \"line-items:li_2\": \"line item with id 3\",\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/commented-simple-text-element/locales/commented-simple-text-element.fr.json":"{\n  \"model\": {},\n  \"text\": \" fr outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \" fr outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"div_9:span\": \"fr simple text within div\",\n  \"div_9:span_1\": \"fr simple text within div 2\",\n  \"div_9:div_2:div\": \"fr great grandchild text within div\",\n  \"div_10:text\": \" fr simple text as the first element in div \",\n  \"div_10:span_1\": \"fr simple text within div\",\n  \"div_10:text_2\": \" fr simple text in the middle of div \",\n  \"div_10:span_3\": \"fr simple text within div 2\",\n  \"div_10:div_4:div\": \"fr great grandchild text within div\",\n  \"div_10:text_5\": \" fr simple text at the last element in div \",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"third-level-div\": \"fr great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr great grandchild text within div without id\",\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items:li\": \"fr line item with id 1\",\n  \"line-items:li_1\": \"fr line item with id 2\",\n  \"line-items:li_2\": \"fr line item with id 3\",\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \" fr outermost text at the end \"\n}\n","/compound-binding-dom-bind.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": [\n    \" outermost text at the beginning with compound {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"h1_3\": [\n    \"outermost header 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"text_4\": [\n    \" outermost text in the middle with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_5\": [\n    \"simple text without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_6\": [\n    \"simple text without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-1\": [\n    \"simple text with id and {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-2\": [\n    \"simple text with id and {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span_1\": [\n    \"simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:div_2:div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text\": [\n    \" simple text as the first element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_1\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_2\": [\n    \" simple text in the middle of div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_3\": [\n    \"simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:div_4:div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_5\": [\n    \" simple text at the last element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span_1\": [\n    \"simple text within div 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"third-level-div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"second-level-div:div_1\": [\n    \"great grandchild text within div without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li\": [\n    \"line item without id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_1\": [\n    \"line item without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_2\": [\n    \"line item without id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li\": [\n    \"line item with id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_1\": [\n    \"line item with id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_2\": [\n    \"line item with id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1}, {2}, and {3} is converted to {4}.\",\n    \"id\",\n    \"{{param1}}\",\n    \"{{param2}}\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": [\n    \" outermost text at the end with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ]\n}","/compound-binding-element/compound-binding-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": [\n    \" outermost text at the beginning with compound {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"h1_3\": [\n    \"outermost header 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"text_4\": [\n    \" outermost text in the middle with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_5\": [\n    \"simple text without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_6\": [\n    \"simple text without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-1\": [\n    \"simple text with id and {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-2\": [\n    \"simple text with id and {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span_1\": [\n    \"simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:div_2:div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text\": [\n    \" simple text as the first element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_1\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_2\": [\n    \" simple text in the middle of div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_3\": [\n    \"simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:div_4:div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_5\": [\n    \" simple text at the last element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span\": [\n    \"simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span_1\": [\n    \"simple text within div 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"third-level-div\": [\n    \"great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"second-level-div:div_1\": [\n    \"great grandchild text within div without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li\": [\n    \"line item without id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_1\": [\n    \"line item without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_2\": [\n    \"line item without id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li\": [\n    \"line item with id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_1\": [\n    \"line item with id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_2\": [\n    \"line item with id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1}, {2}, and {3} is converted to {4}.\",\n    \"id\",\n    \"{{param1}}\",\n    \"{{param2}}\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": [\n    \" outermost text at the end with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ]\n}","/compound-binding-element/locales/compound-binding-element.fr.json":"{\n  \"model\": {},\n  \"text\": [\n    \" fr outermost text at the beginning with compound {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"h1_3\": [\n    \"fr outermost header 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"text_4\": [\n    \" fr outermost text in the middle with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_5\": [\n    \"fr simple text without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_6\": [\n    \"fr simple text without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-1\": [\n    \"fr simple text with id and {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-2\": [\n    \"fr simple text with id and {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span_1\": [\n    \"fr simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:div_2:div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text\": [\n    \" fr simple text as the first element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_1\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_2\": [\n    \" fr simple text in the middle of div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_3\": [\n    \"fr simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:div_4:div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_5\": [\n    \" fr simple text at the last element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span_1\": [\n    \"fr simple text within div 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"third-level-div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"second-level-div:div_1\": [\n    \"fr great grandchild text within div without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li\": [\n    \"fr line item without id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_1\": [\n    \"fr line item without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_2\": [\n    \"fr line item without id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li\": [\n    \"fr line item with id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_1\": [\n    \"fr line item with id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_2\": [\n    \"fr line item with id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1}, {2}, and {3} is converted to {4}.\",\n    \"fr id\",\n    \"{{param1}}\",\n    \"{{param2}}\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": [\n    \" fr outermost text at the end with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ]\n}\n","/edge-case-dom-bind.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": [\n    \" name = {1} \",\n    \"{{text.name}}\"\n  ],\n  \"i18n-number_1\": \"1\",\n  \"i18n-format_2\": [\n    \"{{text.format}}\",\n    \"1\"\n  ],\n  \"i18n-format_3\": [\n    \"format\",\n    \"\"\n  ],\n  \"p_8\": [\n    \"hello {1}{2} {3} world\",\n    \"<br>\",\n    \"<span>\",\n    \"<span>\"\n  ],\n  \"p_9\": [\n    \"hello{1}world\",\n    \"<br>\"\n  ],\n  \"text_10\": \" hello \",\n  \"text_14\": \" world \"\n}","/edge-case/advanced-binding-element.json":"{\n  \"meta\": {},\n  \"model\": {\n    \"aria-attributes\": {\n      \"title\": \"tooltip text\",\n      \"aria-label\": \"aria label text\",\n      \"aria-valuetext\": \"aria value text\"\n    }\n  },\n  \"annotated-format\": [\n    \"{{tr(status,text.statusMessageFormats)}}\",\n    \"{{parameter}}\",\n    \"string parameter\"\n  ],\n  \"span_5\": [\n    \"{1} {2}\",\n    \"{{text.defaultValue}}\",\n    \"{{text.defaultValue}}\"\n  ],\n  \"statusMessages\": {\n    \"ok\": \"healthy status\",\n    \"busy\": \"busy status\",\n    \"error\": \"error status\",\n    \"default\": \"unknown status\"\n  },\n  \"defaultValue\": \"default value\",\n  \"statusMessageFormats\": {\n    \"ok\": \"healthy status\",\n    \"busy\": \"busy status with {2}\",\n    \"error\": \"error status with {1} and {2}\",\n    \"default\": \"unknown status\"\n  },\n  \"nodefault\": {\n    \"ok\": \"ok status\"\n  }\n}","/edge-case/complex-compound-binding-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"item-update2:text\": [\n    \"updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update2:text_2\": \" xxx \",\n  \"item-update2:dom-if_3:template:span:b\": \"IF CONTENT\",\n  \"item-update2:b_4\": \"abc\",\n  \"item-update2:dom-if_5:template:text\": \"IF CONTENT 2\",\n  \"item-update2:text_6\": \" hello \",\n  \"item-update:text\": [\n    \"updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update:text_2\": \" xxx \",\n  \"item-update:dom-if_3:template:b\": \"IF CONTENT\",\n  \"item-update:b_4\": \"abc\",\n  \"item-update:dom-if_5:template:text\": \"IF CONTENT 2\",\n  \"item-update:text_6\": \" hello \",\n  \"item-update3:text\": [\n    \"updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update3:text_2\": \" xxx \",\n  \"item-update3:dom-if_3:template:b\": \"IF\",\n  \"item-update3:dom-if_3:template:b_1\": \"CONTENT\",\n  \"item-update3:b_4\": \"abc\",\n  \"item-update3:dom-if_5:template:text\": \"IF CONTENT 2\",\n  \"item-update3:text_6\": \" hello \",\n  \"item-update4:text\": [\n    \"updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update4:dom-repeat_1:template:text\": [\n    \" {1} = {2} \",\n    \"{{item.name}}\",\n    \"{{text.updated}}\"\n  ],\n  \"item-update4:text_2\": \" xxx \",\n  \"item-update4:dom-if_3:template:b\": \"IF CONTENT\",\n  \"item-update4:b_4\": \"abc\",\n  \"item-update4:dom-if_5:template:text\": \"IF CONTENT 2\",\n  \"item-update4:text_6\": \" hello \",\n  \"paragraph:text\": \"A paragraph with \",\n  \"paragraph:text_2\": \" is converted to \",\n  \"paragraph:code_3\": \"<i18n-format>\",\n  \"paragraph:text_4\": \". \",\n  \"paragraph2:text\": \"A paragraph with deep \",\n  \"paragraph2:text_2\": \" is \",\n  \"paragraph2:b_3\": \"not\",\n  \"paragraph2:text_4\": \" converted to \",\n  \"paragraph2:code_5\": \"<i18n-format>\",\n  \"paragraph2:text_6\": \". \",\n  \"authors\": [\n    {\n      \"name\": \"Joe\"\n    },\n    {\n      \"name\": \"Alice\"\n    }\n  ],\n  \"updated\": \"Jan 1st, 2016\",\n  \"parameters\": [\n    \"parameter 1\",\n    \"parameter 2\"\n  ]\n}","/edge-case/empty-element.json":"{}","/edge-case/locales/advanced-binding-element.fr.json":"{\n  \"meta\": {},\n  \"model\": {\n    \"aria-attributes\": {\n      \"title\": \"fr tooltip text\",\n      \"aria-label\": \"fr aria label text\",\n      \"aria-valuetext\": \"fr aria value text\"\n    }\n  },\n  \"annotated-format\": [\n    \"{{tr(status,text.statusMessageFormats)}}\",\n    \"{{parameter}}\",\n    \"fr string parameter\"\n  ],\n  \"span_5\": [\n    \"fr {1} {2}\",\n    \"{{text.defaultValue}}\",\n    \"{{text.defaultValue}}\"\n  ],\n  \"statusMessages\": {\n    \"ok\": \"fr healthy status\",\n    \"busy\": \"fr busy status\",\n    \"error\": \"fr error status\",\n    \"default\": \"fr unknown status\"\n  },\n  \"defaultValue\": \"fr default value\",\n  \"statusMessageFormats\": {\n    \"ok\": \"fr healthy status\",\n    \"busy\": \"fr busy status with {2}\",\n    \"error\": \"fr error status with {1} and {2}\",\n    \"default\": \"fr unknown status\"\n  },\n  \"nodefault\": {\n    \"ok\": \"fr ok status\"\n  }\n}","/edge-case/locales/complex-compound-binding-element.fr.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"item-update2:text\": [\n    \"fr updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update2:text_2\": \" fr xxx \",\n  \"item-update2:dom-if_3:template:span:b\": \"fr IF CONTENT\",\n  \"item-update2:b_4\": \"fr abc\",\n  \"item-update2:dom-if_5:template:text\": \"fr IF CONTENT 2\",\n  \"item-update2:text_6\": \" fr hello \",\n  \"item-update:text\": [\n    \"fr updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update:text_2\": \" fr xxx \",\n  \"item-update:dom-if_3:template:b\": \"fr IF CONTENT\",\n  \"item-update:b_4\": \"fr abc\",\n  \"item-update:dom-if_5:template:text\": \"fr IF CONTENT 2\",\n  \"item-update:text_6\": \" fr hello \",\n  \"item-update3:text\": [\n    \"fr updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update3:text_2\": \" fr xxx \",\n  \"item-update3:dom-if_3:template:b\": \"fr IF\",\n  \"item-update3:dom-if_3:template:b_1\": \"fr CONTENT\",\n  \"item-update3:b_4\": \"fr abc\",\n  \"item-update3:dom-if_5:template:text\": \"fr IF CONTENT 2\",\n  \"item-update3:text_6\": \" fr hello \",\n  \"item-update4:text\": [\n    \"fr updated: {1}, by: \",\n    \"{{text.updated}}\"\n  ],\n  \"item-update4:dom-repeat_1:template:text\": [\n    \" fr {1} = {2} \",\n    \"{{item.name}}\",\n    \"{{text.updated}}\"\n  ],\n  \"item-update4:text_2\": \" fr xxx \",\n  \"item-update4:dom-if_3:template:b\": \"fr IF CONTENT\",\n  \"item-update4:b_4\": \"fr abc\",\n  \"item-update4:dom-if_5:template:text\": \"fr IF CONTENT 2\",\n  \"item-update4:text_6\": \" fr hello \",\n  \"paragraph:text\": \"fr A paragraph with \",\n  \"paragraph:text_2\": \" fr is converted to \",\n  \"paragraph:code_3\": \"fr <i18n-format>\",\n  \"paragraph:text_4\": \"fr . \",\n  \"paragraph2:text\": \"fr A paragraph with deep \",\n  \"paragraph2:text_2\": \" fr is \",\n  \"paragraph2:b_3\": \"fr not\",\n  \"paragraph2:text_4\": \" fr converted to \",\n  \"paragraph2:code_5\": \"fr <i18n-format>\",\n  \"paragraph2:text_6\": \"fr . \",\n  \"authors\": [\n    {\n      \"name\": \"fr Joe\"\n    },\n    {\n      \"name\": \"fr Alice\"\n    }\n  ],\n  \"updated\": \"fr Jan 1st, 2016\",\n  \"parameters\": [\n    \"fr parameter 1\",\n    \"fr parameter 2\"\n  ]\n}","/edge-case/locales/empty-element.fr.json":"{}","/fallback-text-element/fallback-text-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"third-level-div\": \"great grandchild text within div\",\n  \"second-level-div:div_1\": \"great grandchild text within div without id\",\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items:li\": \"line item with id 1\",\n  \"line-items:li_1\": \"line item with id 2\",\n  \"line-items:li_2\": \"line item with id 3\",\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/fallback-text-element/locales/fallback-text-element.fr-CA.json":"{\n  \"model\": {},\n  \"text\": \"fr-CA  outermost text at the beginning \",\n  \"h1_3\": \"fr-CA outermost header 1\",\n  \"text_4\": \"fr-CA  outermost text in the middle \",\n  \"span_5\": \"fr-CA simple text without id\",\n  \"span_6\": \"fr-CA simple text without id 2\",\n  \"label-1\": \"fr-CA simple text with id\",\n  \"label-2\": \"fr-CA simple text with id 2\",\n  \"div_10:span_1\": \"fr-CA simple text within div\",\n  \"toplevel-div:span\": \"fr-CA simple text within div\",\n  \"toplevel-div:span_1\": \"fr-CA simple text within div 2\",\n  \"third-level-div\": \"fr-CA great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr-CA great grandchild text within div without id\",\n  \"p_13\": [\n    \"fr-CA A paragraph with {1} is converted to {2}.\",\n    \"fr-CA parameters\",\n    \"fr-CA <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr-CA A paragraph with {1} is converted to {2}.\",\n    \"fr-CA id\",\n    \"fr-CA <i18n-format>\"\n  ],\n  \"text_15\": \"fr-CA  outermost text at the end \"\n}\n","/fallback-text-element/locales/fallback-text-element.fr.json":"{\n  \"model\": {},\n  \"text\": \"fr  outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \"fr  outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"third-level-div\": \"fr great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr great grandchild text within div without id\",\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items:li\": \"fr line item with id 1\",\n  \"line-items:li_1\": \"fr line item with id 2\",\n  \"line-items:li_2\": \"fr line item with id 3\",\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \"fr  outermost text at the end \"\n}\n","/locales/compound-binding-dom-bind.fr.json":"{\n  \"model\": {},\n  \"text\": [\n    \" fr outermost text at the beginning with compound {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"h1_3\": [\n    \"fr outermost header 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"text_4\": [\n    \" fr outermost text in the middle with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_5\": [\n    \"fr simple text without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"span_6\": [\n    \"fr simple text without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-1\": [\n    \"fr simple text with id and {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"label-2\": [\n    \"fr simple text with id and {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:span_1\": [\n    \"fr simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_9:div_2:div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text\": [\n    \" fr simple text as the first element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_1\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_2\": [\n    \" fr simple text in the middle of div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:span_3\": [\n    \"fr simple text within div with {1} and {2} variables 2\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:div_4:div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_10:text_5\": [\n    \" fr simple text at the last element in div with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span\": [\n    \"fr simple text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"toplevel-div:span_1\": [\n    \"fr simple text within div 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"third-level-div\": [\n    \"fr great grandchild text within div with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"second-level-div:div_1\": [\n    \"fr great grandchild text within div without id with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li\": [\n    \"fr line item without id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_1\": [\n    \"fr line item without id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"div_12:ul:li_2\": [\n    \"fr line item without id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li\": [\n    \"fr line item with id 1 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_1\": [\n    \"fr line item with id 2 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"line-items:li_2\": [\n    \"fr line item with id 3 with {1} and {2} variables\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1}, {2}, and {3} is converted to {4}.\",\n    \"fr id\",\n    \"{{param1}}\",\n    \"{{param2}}\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": [\n    \" fr outermost text at the end with {1} and {2} variables \",\n    \"{{param1}}\",\n    \"{{param2}}\"\n  ]\n}\n","/locales/simple-attribute-dom-bind.fr.json":"{\n  \"model\": {\n    \"standard-input\": {\n      \"placeholder\": \"fr standard HTML5 attribute\"\n    },\n    \"outer-div:input_2\": {\n      \"placeholder\": \"fr standard HTML5 attribute without id\"\n    },\n    \"paper-input-element\": {\n      \"label\": \"fr paper-input label\",\n      \"error-message\": \"fr paper-input error message\",\n      \"placeholder\": \"fr paper-input placeholder\"\n    },\n    \"outer-div:paper-input_4\": {\n      \"label\": \"fr paper-input label without id\",\n      \"error-message\": \"fr paper-input error message without id\",\n      \"placeholder\": \"fr paper-input placeholder without id\"\n    },\n    \"pie-chart\": {\n      \"options\": {\n        \"title\": \"fr Distribution of days in 2001H1\"\n      },\n      \"cols\": [\n        {\n          \"label\": \"fr Month\",\n          \"type\": \"string\"\n        },\n        {\n          \"label\": \"fr Days\",\n          \"type\": \"number\"\n        }\n      ],\n      \"rows\": [\n        [\n          \"fr Jan\",\n          31\n        ],\n        [\n          \"fr Feb\",\n          28\n        ],\n        [\n          \"fr Mar\",\n          31\n        ],\n        [\n          \"fr Apr\",\n          30\n        ],\n        [\n          \"fr May\",\n          31\n        ],\n        [\n          \"fr Jun\",\n          30\n        ]\n      ]\n    },\n    \"column-chart\": {\n      \"options\": {\n        \"title\": \"fr Inventory\"\n      },\n      \"data\": [\n        [\n          \"fr Year\",\n          \"fr Things\",\n          \"fr Stuff\"\n        ],\n        [\n          \"2004\",\n          1000,\n          400\n        ],\n        [\n          \"2005\",\n          1170,\n          460\n        ],\n        [\n          \"2006\",\n          660,\n          1120\n        ],\n        [\n          \"2007\",\n          1030,\n          540\n        ]\n      ]\n    },\n    \"custom-attr\": {\n      \"custom-text-attr1\": \"fr custom text attribute 1\",\n      \"custom-text-attr2\": \"fr custom text attribute 2\",\n      \"custom-text-attr3\": \"fr custom text attribute 3\"\n    },\n    \"selective-attr\": {\n      \"custom-text-attr4\": [\n        \"fr {1} custom-text-attr4 attribute with param {2} and param {3} {4}\",\n        \"{{text.ordinary-div}}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\",\n        \"{{text.ordinary-div}}\"\n      ],\n      \"custom-text-attr5\": [\n        \"[[text.ordinary-div]]\",\n        \" fr custom-text-attr5 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" fr and param \",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target\": [\n        \"fr i18n-target attribute with param {1} and param {2}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target2\": [\n        \"fr i18n-target2 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" fr and param \",\n        \"[[text.ordinary-div]]\"\n      ]\n    },\n    \"selective-attr2\": {\n      \"i18n-target\": \"fr i18n-target attribute 2\"\n    },\n    \"selective-attr3\": {\n      \"i18n-target6\": \"fr i18n-target6 attribute 2\"\n    },\n    \"selective-attr4\": {\n      \"i18n-target6\": \"fr i18n-target6 attribute 3\"\n    },\n    \"json-data-id\": {\n      \"attr1\": \"fr this attr1 is extracted\",\n      \"i18n-target-attr\": \"fr this attribute is also extracted\"\n    },\n    \"template_2:json-data_1\": {\n      \"attr1\": \"fr this attr1 without id is extracted\",\n      \"i18n-target-attr\": \"fr this attribute without id is also extracted\"\n    }\n  },\n  \"ordinary-div\": \"fr text 1\"\n}\n","/locales/simple-text-dom-bind.fr.json":"{\n  \"model\": {},\n  \"text\": \" fr outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \" fr outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"div_9:span\": \"fr simple text within div\",\n  \"div_9:span_1\": \"fr simple text within div 2\",\n  \"div_9:div_2:div\": \"fr great grandchild text within div\",\n  \"div_10:text\": \" fr simple text as the first element in div \",\n  \"div_10:span_1\": \"fr simple text within div\",\n  \"div_10:text_2\": \" fr simple text in the middle of div \",\n  \"div_10:span_3\": \"fr simple text within div 2\",\n  \"div_10:div_4:div\": \"fr great grandchild text within div\",\n  \"div_10:text_5\": \" fr simple text at the last element in div \",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"third-level-div\": \"fr great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr great grandchild text within div without id\",\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items:li\": \"fr line item with id 1\",\n  \"line-items:li_1\": \"fr line item with id 2\",\n  \"line-items:li_2\": \"fr line item with id 3\",\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \" fr outermost text at the end \"\n}\n","/multiple-case/item-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"label\": \"A\"\n}","/multiple-case/locales/item-element.fr.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"label\": \"fr A\"\n}","/multiple-case/locales/multiple-element.fr.json":"{\n  \"meta\": {},\n  \"model\": {}\n}","/multiple-case/multiple-element.json":"{\n  \"meta\": {},\n  \"model\": {}\n}","/plural-gender-element/locales/plural-gender-element.fr.json":"{\n  \"model\": {},\n  \"compound-format-text\": [\n    {\n      \"0\": \"fr You ({3}) gave no gifts.\",\n      \"1\": {\n        \"male\": \"fr You ({3}) gave him ({4}) {5}.\",\n        \"female\": \"fr You ({3}) gave her ({4}) {5}.\",\n        \"other\": \"fr You ({3}) gave them ({4}) {5}.\"\n      },\n      \"one\": {\n        \"male\": \"fr You ({3}) gave him ({4}) and one other person {5}.\",\n        \"female\": \"fr You ({3}) gave her ({4}) and one other person {5}.\",\n        \"other\": \"fr You ({3}) gave them ({4}) and one other person {5}.\"\n      },\n      \"other\": \"fr You ({3}) gave them ({4}) and {1} other people gifts.\"\n    },\n    \"{{recipients.length - 1}}\",\n    \"{{recipients.0.gender}}\",\n    \"{{sender.name}}\",\n    \"{{recipients.0.name}}\",\n    \"fr a gift\"\n  ]\n}\n","/plural-gender-element/plural-gender-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"compound-format-text\": [\n    {\n      \"0\": \"You ({3}) gave no gifts.\",\n      \"1\": {\n        \"male\": \"You ({3}) gave him ({4}) {5}.\",\n        \"female\": \"You ({3}) gave her ({4}) {5}.\",\n        \"other\": \"You ({3}) gave them ({4}) {5}.\"\n      },\n      \"one\": {\n        \"male\": \"You ({3}) gave him ({4}) and one other person {5}.\",\n        \"female\": \"You ({3}) gave her ({4}) and one other person {5}.\",\n        \"other\": \"You ({3}) gave them ({4}) and one other person {5}.\"\n      },\n      \"other\": \"You ({3}) gave them ({4}) and {1} other people gifts.\"\n    },\n    \"{{recipients.length - 1}}\",\n    \"{{recipients.0.gender}}\",\n    \"{{sender.name}}\",\n    \"{{recipients.0.name}}\",\n    \"a gift\"\n  ]\n}","/preference/preference-element.json":"{\n  \"meta\": {},\n  \"model\": {}\n}","/simple-attribute-dom-bind.json":"{\n  \"meta\": {},\n  \"model\": {\n    \"standard-input\": {\n      \"placeholder\": \"standard HTML5 attribute\"\n    },\n    \"outer-div:input_2\": {\n      \"placeholder\": \"standard HTML5 attribute without id\"\n    },\n    \"paper-input-element\": {\n      \"label\": \"paper-input label\",\n      \"error-message\": \"paper-input error message\",\n      \"placeholder\": \"paper-input placeholder\"\n    },\n    \"outer-div:paper-input_4\": {\n      \"label\": \"paper-input label without id\",\n      \"error-message\": \"paper-input error message without id\",\n      \"placeholder\": \"paper-input placeholder without id\"\n    },\n    \"pie-chart\": {\n      \"options\": {\n        \"title\": \"Distribution of days in 2001H1\"\n      },\n      \"cols\": [\n        {\n          \"label\": \"Month\",\n          \"type\": \"string\"\n        },\n        {\n          \"label\": \"Days\",\n          \"type\": \"number\"\n        }\n      ],\n      \"rows\": [\n        [\n          \"Jan\",\n          31\n        ],\n        [\n          \"Feb\",\n          28\n        ],\n        [\n          \"Mar\",\n          31\n        ],\n        [\n          \"Apr\",\n          30\n        ],\n        [\n          \"May\",\n          31\n        ],\n        [\n          \"Jun\",\n          30\n        ]\n      ]\n    },\n    \"column-chart\": {\n      \"options\": {\n        \"title\": \"Inventory\"\n      },\n      \"data\": [\n        [\n          \"Year\",\n          \"Things\",\n          \"Stuff\"\n        ],\n        [\n          \"2004\",\n          1000,\n          400\n        ],\n        [\n          \"2005\",\n          1170,\n          460\n        ],\n        [\n          \"2006\",\n          660,\n          1120\n        ],\n        [\n          \"2007\",\n          1030,\n          540\n        ]\n      ]\n    },\n    \"custom-attr\": {\n      \"custom-text-attr1\": \"custom text attribute 1\",\n      \"custom-text-attr2\": \"custom text attribute 2\",\n      \"custom-text-attr3\": \"custom text attribute 3\"\n    },\n    \"selective-attr\": {\n      \"custom-text-attr4\": [\n        \"{1} custom-text-attr4 attribute with param {2} and param {3} {4}\",\n        \"{{text.ordinary-div}}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\",\n        \"{{text.ordinary-div}}\"\n      ],\n      \"custom-text-attr5\": [\n        \"[[text.ordinary-div]]\",\n        \" custom-text-attr5 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" and param \",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target\": [\n        \"i18n-target attribute with param {1} and param {2}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target2\": [\n        \"i18n-target2 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" and param \",\n        \"[[text.ordinary-div]]\"\n      ]\n    },\n    \"selective-attr2\": {\n      \"i18n-target\": \"i18n-target attribute 2\"\n    },\n    \"selective-attr3\": {\n      \"i18n-target6\": \"i18n-target6 attribute 2\"\n    },\n    \"selective-attr4\": {\n      \"i18n-target6\": \"i18n-target6 attribute 3\"\n    },\n    \"json-data-id\": {\n      \"attr1\": \"this attr1 is extracted\",\n      \"i18n-target-attr\": \"this attribute is also extracted\"\n    },\n    \"template_2:json-data_1\": {\n      \"attr1\": \"this attr1 without id is extracted\",\n      \"i18n-target-attr\": \"this attribute without id is also extracted\"\n    }\n  },\n  \"ordinary-div\": \"text 1\"\n}","/simple-attribute-element/locales/simple-attribute-element.fr.json":"{\n  \"model\": {\n    \"standard-input\": {\n      \"placeholder\": \"fr standard HTML5 attribute\"\n    },\n    \"outer-div:input_2\": {\n      \"placeholder\": \"fr standard HTML5 attribute without id\"\n    },\n    \"paper-input-element\": {\n      \"label\": \"fr paper-input label\",\n      \"error-message\": \"fr paper-input error message\",\n      \"placeholder\": \"fr paper-input placeholder\"\n    },\n    \"outer-div:paper-input_4\": {\n      \"label\": \"fr paper-input label without id\",\n      \"error-message\": \"fr paper-input error message without id\",\n      \"placeholder\": \"fr paper-input placeholder without id\"\n    },\n    \"pie-chart\": {\n      \"options\": {\n        \"title\": \"fr Distribution of days in 2001H1\"\n      },\n      \"cols\": [\n        {\n          \"label\": \"fr Month\",\n          \"type\": \"string\"\n        },\n        {\n          \"label\": \"fr Days\",\n          \"type\": \"number\"\n        }\n      ],\n      \"rows\": [\n        [\n          \"fr Jan\",\n          31\n        ],\n        [\n          \"fr Feb\",\n          28\n        ],\n        [\n          \"fr Mar\",\n          31\n        ],\n        [\n          \"fr Apr\",\n          30\n        ],\n        [\n          \"fr May\",\n          31\n        ],\n        [\n          \"fr Jun\",\n          30\n        ]\n      ]\n    },\n    \"column-chart\": {\n      \"options\": {\n        \"title\": \"fr Inventory\"\n      },\n      \"data\": [\n        [\n          \"fr Year\",\n          \"fr Things\",\n          \"fr Stuff\"\n        ],\n        [\n          \"2004\",\n          1000,\n          400\n        ],\n        [\n          \"2005\",\n          1170,\n          460\n        ],\n        [\n          \"2006\",\n          660,\n          1120\n        ],\n        [\n          \"2007\",\n          1030,\n          540\n        ]\n      ]\n    },\n    \"custom-attr\": {\n      \"custom-text-attr1\": \"fr custom text attribute 1\",\n      \"custom-text-attr2\": \"fr custom text attribute 2\",\n      \"custom-text-attr3\": \"fr custom text attribute 3\"\n    },\n    \"selective-attr\": {\n      \"custom-text-attr4\": [\n        \"fr {1} custom-text-attr4 attribute with param {2} and param {3} {4}\",\n        \"{{text.ordinary-div}}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\",\n        \"{{text.ordinary-div}}\"\n      ],\n      \"custom-text-attr5\": [\n        \"[[text.ordinary-div]]\",\n        \" fr custom-text-attr5 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" fr and param \",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target\": [\n        \"fr i18n-target attribute with param {1} and param {2}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target2\": [\n        \"fr i18n-target2 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" fr and param \",\n        \"[[text.ordinary-div]]\"\n      ]\n    },\n    \"selective-attr2\": {\n      \"i18n-target\": \"fr i18n-target attribute 2\"\n    },\n    \"selective-attr3\": {\n      \"i18n-target6\": \"fr i18n-target6 attribute 2\"\n    },\n    \"selective-attr4\": {\n      \"i18n-target6\": \"fr i18n-target6 attribute 3\"\n    },\n    \"json-data-id\": {\n      \"attr1\": \"fr this attr1 is extracted\",\n      \"i18n-target-attr\": \"fr this attribute is also extracted\"\n    },\n    \"template_2:json-data_1\": {\n      \"attr1\": \"fr this attr1 without id is extracted\",\n      \"i18n-target-attr\": \"fr this attribute without id is also extracted\"\n    }\n  },\n  \"ordinary-div\": \"fr text 1\"\n}\n","/simple-attribute-element/locales/text-attribute-element.fr.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"span_4\": \"fr text\"\n}\n","/simple-attribute-element/simple-attribute-element.json":"{\n  \"meta\": {},\n  \"model\": {\n    \"standard-input\": {\n      \"placeholder\": \"standard HTML5 attribute\"\n    },\n    \"outer-div:input_2\": {\n      \"placeholder\": \"standard HTML5 attribute without id\"\n    },\n    \"paper-input-element\": {\n      \"label\": \"paper-input label\",\n      \"error-message\": \"paper-input error message\",\n      \"placeholder\": \"paper-input placeholder\"\n    },\n    \"outer-div:paper-input_4\": {\n      \"label\": \"paper-input label without id\",\n      \"error-message\": \"paper-input error message without id\",\n      \"placeholder\": \"paper-input placeholder without id\"\n    },\n    \"pie-chart\": {\n      \"options\": {\n        \"title\": \"Distribution of days in 2001H1\"\n      },\n      \"cols\": [\n        {\n          \"label\": \"Month\",\n          \"type\": \"string\"\n        },\n        {\n          \"label\": \"Days\",\n          \"type\": \"number\"\n        }\n      ],\n      \"rows\": [\n        [\n          \"Jan\",\n          31\n        ],\n        [\n          \"Feb\",\n          28\n        ],\n        [\n          \"Mar\",\n          31\n        ],\n        [\n          \"Apr\",\n          30\n        ],\n        [\n          \"May\",\n          31\n        ],\n        [\n          \"Jun\",\n          30\n        ]\n      ]\n    },\n    \"column-chart\": {\n      \"options\": {\n        \"title\": \"Inventory\"\n      },\n      \"data\": [\n        [\n          \"Year\",\n          \"Things\",\n          \"Stuff\"\n        ],\n        [\n          \"2004\",\n          1000,\n          400\n        ],\n        [\n          \"2005\",\n          1170,\n          460\n        ],\n        [\n          \"2006\",\n          660,\n          1120\n        ],\n        [\n          \"2007\",\n          1030,\n          540\n        ]\n      ]\n    },\n    \"custom-attr\": {\n      \"custom-text-attr1\": \"custom text attribute 1\",\n      \"custom-text-attr2\": \"custom text attribute 2\",\n      \"custom-text-attr3\": \"custom text attribute 3\"\n    },\n    \"selective-attr\": {\n      \"custom-text-attr4\": [\n        \"{1} custom-text-attr4 attribute with param {2} and param {3} {4}\",\n        \"{{text.ordinary-div}}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\",\n        \"{{text.ordinary-div}}\"\n      ],\n      \"custom-text-attr5\": [\n        \"[[text.ordinary-div]]\",\n        \" custom-text-attr5 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" and param \",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target\": [\n        \"i18n-target attribute with param {1} and param {2}\",\n        \"{{text.ordinary-div}}\",\n        \"[[text.ordinary-div]]\"\n      ],\n      \"i18n-target2\": [\n        \"i18n-target2 attribute with param \",\n        \"{{or('',text.ordinary-div)}}\",\n        \" and param \",\n        \"[[text.ordinary-div]]\"\n      ]\n    },\n    \"selective-attr2\": {\n      \"i18n-target\": \"i18n-target attribute 2\"\n    },\n    \"selective-attr3\": {\n      \"i18n-target6\": \"i18n-target6 attribute 2\"\n    },\n    \"selective-attr4\": {\n      \"i18n-target6\": \"i18n-target6 attribute 3\"\n    },\n    \"json-data-id\": {\n      \"attr1\": \"this attr1 is extracted\",\n      \"i18n-target-attr\": \"this attribute is also extracted\"\n    },\n    \"template_2:json-data_1\": {\n      \"attr1\": \"this attr1 without id is extracted\",\n      \"i18n-target-attr\": \"this attribute without id is also extracted\"\n    }\n  },\n  \"ordinary-div\": \"text 1\"\n}","/simple-attribute-element/text-attribute-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"span_4\": \"text\"\n}","/simple-text-dom-bind.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"third-level-div\": \"great grandchild text within div\",\n  \"second-level-div:div_1\": \"great grandchild text within div without id\",\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items:li\": \"line item with id 1\",\n  \"line-items:li_1\": \"line item with id 2\",\n  \"line-items:li_2\": \"line item with id 3\",\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/simple-text-element/locales/simple-text-element.fr.json":"{\n  \"model\": {},\n  \"text\": \" fr outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \" fr outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"div_9:span\": \"fr simple text within div\",\n  \"div_9:span_1\": \"fr simple text within div 2\",\n  \"div_9:div_2:div\": \"fr great grandchild text within div\",\n  \"div_10:text\": \" fr simple text as the first element in div \",\n  \"div_10:span_1\": \"fr simple text within div\",\n  \"div_10:text_2\": \" fr simple text in the middle of div \",\n  \"div_10:span_3\": \"fr simple text within div 2\",\n  \"div_10:div_4:div\": \"fr great grandchild text within div\",\n  \"div_10:text_5\": \" fr simple text at the last element in div \",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"third-level-div\": \"fr great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr great grandchild text within div without id\",\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items:li\": \"fr line item with id 1\",\n  \"line-items:li_1\": \"fr line item with id 2\",\n  \"line-items:li_2\": \"fr line item with id 3\",\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \" fr outermost text at the end \"\n}\n","/simple-text-element/locales/simple-text-element.ru.json":"{\n  \"model\": {},\n  \"text\": \" ru outermost text at the beginning \",\n  \"h1_3\": \"ru outermost header 1\",\n  \"text_4\": \" ru outermost text in the middle \",\n  \"span_5\": \"ru simple text without id\",\n  \"span_6\": \"ru simple text without id 2\",\n  \"label-1\": \"ru simple text with id\",\n  \"label-2\": \"ru simple text with id 2\",\n  \"div_9:span\": \"ru simple text within div\",\n  \"div_9:span_1\": \"ru simple text within div 2\",\n  \"div_9:div_2:div\": \"ru great grandchild text within div\",\n  \"div_10:text\": \" ru simple text as the first element in div \",\n  \"div_10:span_1\": \"ru simple text within div\",\n  \"div_10:text_2\": \" ru simple text in the middle of div \",\n  \"div_10:span_3\": \"ru simple text within div 2\",\n  \"div_10:div_4:div\": \"ru great grandchild text within div\",\n  \"div_10:text_5\": \" ru simple text at the last element in div \",\n  \"toplevel-div:span\": \"ru simple text within div\",\n  \"toplevel-div:span_1\": \"ru simple text within div 2\",\n  \"third-level-div\": \"ru great grandchild text within div\",\n  \"second-level-div:div_1\": \"ru great grandchild text within div without id\",\n  \"div_12:ul:li\": \"ru line item without id 1\",\n  \"div_12:ul:li_1\": \"ru line item without id 2\",\n  \"div_12:ul:li_2\": \"ru line item without id 3\",\n  \"line-items:li\": \"ru line item with id 1\",\n  \"line-items:li_1\": \"ru line item with id 2\",\n  \"line-items:li_2\": \"ru line item with id 3\",\n  \"p_13\": [\n    \"ru A paragraph with {1} is converted to {2}.\",\n    \"ru parameters\",\n    \"ru <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"ru A paragraph with {1} is converted to {2}.\",\n    \"ru id\",\n    \"ru <i18n-format>\"\n  ],\n  \"text_15\": \" ru outermost text at the end \"\n}\n","/simple-text-element/simple-text-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"third-level-div\": \"great grandchild text within div\",\n  \"second-level-div:div_1\": \"great grandchild text within div without id\",\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items:li\": \"line item with id 1\",\n  \"line-items:li_1\": \"line item with id 2\",\n  \"line-items:li_2\": \"line item with id 3\",\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/simple-text-id-element/locales/simple-text-id-element.fr.json":"{\n  \"model\": {},\n  \"text\": \" fr outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \" fr outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"div_9:span\": \"fr simple text within div\",\n  \"div_9:span_1\": \"fr simple text within div 2\",\n  \"div_9:div_2:div\": \"fr great grandchild text within div\",\n  \"div_10:text\": \" fr simple text as the first element in div \",\n  \"div_10:span_1\": \"fr simple text within div\",\n  \"div_10:text_2\": \" fr simple text in the middle of div \",\n  \"div_10:span_3\": \"fr simple text within div 2\",\n  \"div_10:div_4:div\": \"fr great grandchild text within div\",\n  \"div_10:text_5\": \" fr simple text at the last element in div \",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"second-level-div\": [\n    \" fr {1}\\n        {2} \",\n    \"fr great grandchild text within div\",\n    \"fr great grandchild text within div without id\"\n  ],\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items\": [\n    \" fr {1}\\n        {2}\\n        {3} \",\n    \"fr line item with id 1\",\n    \"fr line item with id 2\",\n    \"fr line item with id 3\"\n  ],\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \" fr outermost text at the end \"\n}\n","/simple-text-id-element/simple-text-id-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"second-level-div\": [\n    \" {1}\\n        {2} \",\n    \"great grandchild text within div\",\n    \"great grandchild text within div without id\"\n  ],\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items\": [\n    \" {1}\\n        {2}\\n        {3} \",\n    \"line item with id 1\",\n    \"line item with id 2\",\n    \"line item with id 3\"\n  ],\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/template-default-lang/locales/null-template-default-lang-element.ja.json":"","/template-default-lang/locales/null-template-default-lang-element.zh-Hans-CN.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" zh-Hans-CN outermost text at the beginning \",\n  \"h1_3\": \"zh-Hans-CN outermost header 1\",\n  \"text_4\": \" zh-Hans-CN outermost text in the middle \",\n  \"span_5\": \"zh-Hans-CN simple text without id\",\n  \"span_6\": \"zh-Hans-CN simple text without id 2\",\n  \"label-1\": \"zh-Hans-CN simple text with id\",\n  \"label-2\": \"zh-Hans-CN simple text with id 2\",\n  \"div_9:span\": \"zh-Hans-CN simple text within div\",\n  \"div_9:span_1\": \"zh-Hans-CN simple text within div 2\",\n  \"div_9:div_2:div\": \"zh-Hans-CN great grandchild text within div\",\n  \"div_10:text\": \" zh-Hans-CN simple text as the first element in div \",\n  \"div_10:span_1\": \"zh-Hans-CN simple text within div\",\n  \"div_10:text_2\": \" zh-Hans-CN simple text in the middle of div \",\n  \"div_10:span_3\": \"zh-Hans-CN simple text within div 2\",\n  \"div_10:div_4:div\": \"zh-Hans-CN great grandchild text within div\",\n  \"div_10:text_5\": \" zh-Hans-CN simple text at the last element in div \",\n  \"toplevel-div:span\": \"zh-Hans-CN simple text within div\",\n  \"toplevel-div:span_1\": \"zh-Hans-CN simple text within div 2\",\n  \"third-level-div\": \"zh-Hans-CN great grandchild text within div\",\n  \"second-level-div:div_1\": \"zh-Hans-CN great grandchild text within div without id\",\n  \"div_12:ul:li\": \"zh-Hans-CN line item without id 1\",\n  \"div_12:ul:li_1\": \"zh-Hans-CN line item without id 2\",\n  \"div_12:ul:li_2\": \"zh-Hans-CN line item without id 3\",\n  \"line-items:li\": \"zh-Hans-CN line item with id 1\",\n  \"line-items:li_1\": \"zh-Hans-CN line item with id 2\",\n  \"line-items:li_2\": \"zh-Hans-CN line item with id 3\",\n  \"p_13\": [\n    \"zh-Hans-CN A paragraph with {1} is converted to {2}.\",\n    \"zh-Hans-CN parameters\",\n    \"zh-Hans-CN <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"zh-Hans-CN A paragraph with {1} is converted to {2}.\",\n    \"zh-Hans-CN id\",\n    \"zh-Hans-CN <i18n-format>\"\n  ],\n  \"text_15\": \" zh-Hans-CN outermost text at the end \"\n}","/template-default-lang/locales/template-default-lang-element.zh-Hans-CN.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" zh-Hans-CN outermost text at the beginning \",\n  \"h1_3\": \"zh-Hans-CN outermost header 1\",\n  \"text_4\": \" zh-Hans-CN outermost text in the middle \",\n  \"span_5\": \"zh-Hans-CN simple text without id\",\n  \"span_6\": \"zh-Hans-CN simple text without id 2\",\n  \"label-1\": \"zh-Hans-CN simple text with id\",\n  \"label-2\": \"zh-Hans-CN simple text with id 2\",\n  \"div_9:span\": \"zh-Hans-CN simple text within div\",\n  \"div_9:span_1\": \"zh-Hans-CN simple text within div 2\",\n  \"div_9:div_2:div\": \"zh-Hans-CN great grandchild text within div\",\n  \"div_10:text\": \" zh-Hans-CN simple text as the first element in div \",\n  \"div_10:span_1\": \"zh-Hans-CN simple text within div\",\n  \"div_10:text_2\": \" zh-Hans-CN simple text in the middle of div \",\n  \"div_10:span_3\": \"zh-Hans-CN simple text within div 2\",\n  \"div_10:div_4:div\": \"zh-Hans-CN great grandchild text within div\",\n  \"div_10:text_5\": \" zh-Hans-CN simple text at the last element in div \",\n  \"toplevel-div:span\": \"zh-Hans-CN simple text within div\",\n  \"toplevel-div:span_1\": \"zh-Hans-CN simple text within div 2\",\n  \"third-level-div\": \"zh-Hans-CN great grandchild text within div\",\n  \"second-level-div:div_1\": \"zh-Hans-CN great grandchild text within div without id\",\n  \"div_12:ul:li\": \"zh-Hans-CN line item without id 1\",\n  \"div_12:ul:li_1\": \"zh-Hans-CN line item without id 2\",\n  \"div_12:ul:li_2\": \"zh-Hans-CN line item without id 3\",\n  \"line-items:li\": \"zh-Hans-CN line item with id 1\",\n  \"line-items:li_1\": \"zh-Hans-CN line item with id 2\",\n  \"line-items:li_2\": \"zh-Hans-CN line item with id 3\",\n  \"p_13\": [\n    \"zh-Hans-CN A paragraph with {1} is converted to {2}.\",\n    \"zh-Hans-CN parameters\",\n    \"zh-Hans-CN <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"zh-Hans-CN A paragraph with {1} is converted to {2}.\",\n    \"zh-Hans-CN id\",\n    \"zh-Hans-CN <i18n-format>\"\n  ],\n  \"text_15\": \" zh-Hans-CN outermost text at the end \"\n}","/template-default-lang/null-template-default-lang-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" outermost text at the beginning \",\n  \"h1_3\": \"outermost header 1\",\n  \"text_4\": \" outermost text in the middle \",\n  \"span_5\": \"simple text without id\",\n  \"span_6\": \"simple text without id 2\",\n  \"label-1\": \"simple text with id\",\n  \"label-2\": \"simple text with id 2\",\n  \"div_9:span\": \"simple text within div\",\n  \"div_9:span_1\": \"simple text within div 2\",\n  \"div_9:div_2:div\": \"great grandchild text within div\",\n  \"div_10:text\": \" simple text as the first element in div \",\n  \"div_10:span_1\": \"simple text within div\",\n  \"div_10:text_2\": \" simple text in the middle of div \",\n  \"div_10:span_3\": \"simple text within div 2\",\n  \"div_10:div_4:div\": \"great grandchild text within div\",\n  \"div_10:text_5\": \" simple text at the last element in div \",\n  \"toplevel-div:span\": \"simple text within div\",\n  \"toplevel-div:span_1\": \"simple text within div 2\",\n  \"third-level-div\": \"great grandchild text within div\",\n  \"second-level-div:div_1\": \"great grandchild text within div without id\",\n  \"div_12:ul:li\": \"line item without id 1\",\n  \"div_12:ul:li_1\": \"line item without id 2\",\n  \"div_12:ul:li_2\": \"line item without id 3\",\n  \"line-items:li\": \"line item with id 1\",\n  \"line-items:li_1\": \"line item with id 2\",\n  \"line-items:li_2\": \"line item with id 3\",\n  \"p_13\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"parameters\",\n    \"<i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"A paragraph with {1} is converted to {2}.\",\n    \"id\",\n    \"<i18n-format>\"\n  ],\n  \"text_15\": \" outermost text at the end \"\n}","/template-default-lang/template-default-lang-element.json":"{\n  \"meta\": {},\n  \"model\": {},\n  \"text\": \" fr outermost text at the beginning \",\n  \"h1_3\": \"fr outermost header 1\",\n  \"text_4\": \" fr outermost text in the middle \",\n  \"span_5\": \"fr simple text without id\",\n  \"span_6\": \"fr simple text without id 2\",\n  \"label-1\": \"fr simple text with id\",\n  \"label-2\": \"fr simple text with id 2\",\n  \"div_9:span\": \"fr simple text within div\",\n  \"div_9:span_1\": \"fr simple text within div 2\",\n  \"div_9:div_2:div\": \"fr great grandchild text within div\",\n  \"div_10:text\": \" fr simple text as the first element in div \",\n  \"div_10:span_1\": \"fr simple text within div\",\n  \"div_10:text_2\": \" fr simple text in the middle of div \",\n  \"div_10:span_3\": \"fr simple text within div 2\",\n  \"div_10:div_4:div\": \"fr great grandchild text within div\",\n  \"div_10:text_5\": \" fr simple text at the last element in div \",\n  \"toplevel-div:span\": \"fr simple text within div\",\n  \"toplevel-div:span_1\": \"fr simple text within div 2\",\n  \"third-level-div\": \"fr great grandchild text within div\",\n  \"second-level-div:div_1\": \"fr great grandchild text within div without id\",\n  \"div_12:ul:li\": \"fr line item without id 1\",\n  \"div_12:ul:li_1\": \"fr line item without id 2\",\n  \"div_12:ul:li_2\": \"fr line item without id 3\",\n  \"line-items:li\": \"fr line item with id 1\",\n  \"line-items:li_1\": \"fr line item with id 2\",\n  \"line-items:li_2\": \"fr line item with id 3\",\n  \"p_13\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr parameters\",\n    \"fr <i18n-format>\"\n  ],\n  \"paragraph\": [\n    \"fr A paragraph with {1} is converted to {2}.\",\n    \"fr id\",\n    \"fr <i18n-format>\"\n  ],\n  \"text_15\": \" fr outermost text at the end \"\n}"};window.deepcopy=deepcopy;if(!Number.isNaN){Number.isNaN=function(value){return"number"===typeof value&&isNaN(value)}}window.p=Object.setPrototypeOf||function(target,base){var obj=Object.create(base);for(var p in target){obj[p]=target[p]}return obj};window.g=Object.getPrototypeOf;window._name="suite";window.suiteMap={null:{}};window.s=function(name,baseName,extension){if(suiteMap[name]){throw new Error("duplicate suite name "+name)}if(!suiteMap[baseName]){throw new Error("inexistent base suite name "+baseName)}extension[_name]=name;extension=p(extension,suiteMap[baseName]);suiteMap[name]=extension;return extension};window.updateProperty=function updateProperty(element,properties){for(var name in properties){var path=name.split(/[.]/);if(1===path.length){element[name]=properties[name]}else{var cursor=element,p=path.shift();while(p){if(1>path.length){cursor[p]=properties[name];element.notifyPath(name,properties[name],!0);break}else if("PolymerDom"===p){cursor=dom(cursor)}else if("html"===p){cursor=document.querySelector("html")}else{cursor=cursor[p]}p=path.shift()}}}};window.getProperty=function getProperty(target,name){var path=name.split(/[.]/);if(1===path.length){switch(name){case"textContent":return Array.prototype.map.call(target.childNodes,function(n){return n.nodeType===n.TEXT_NODE?n.textContent:""}).join("");default:return target[name];break;}}else{var cursor=target,p=path.shift();while(p){if(1>path.length){if("raw"===p||"text"===p){return cursor}else if("trim"===p){return cursor.trim()}if("data"===p){cursor=cursor[p];cursor=cursor.replace(/^[\s]{1,}/g," ").replace(/[\s]{1,}$/g," ");return cursor}else{return cursor[p]}}else if("PolymerDom"===p){cursor=dom(cursor)}else if("previousTextSibling"===p){do{cursor=cursor.previousSibling}while(cursor.nodeType===cursor.COMMENT_NODE||cursor.nodeType===cursor.TEXT_NODE&&cursor.data.match(/^[\s]*$/))}else if("nextTextSibling"===p){do{cursor=cursor.nextSibling}while(cursor.nodeType===cursor.COMMENT_NODE||cursor.nodeType===cursor.TEXT_NODE&&cursor.data.match(/^[\s]*$/))}else if("effectiveChildNodes"===p){cursor=cursor.getEffectiveChildNodes()}else if("nonWS"===p){cursor=Array.prototype.filter.call(cursor,function(item){return item.nodeType!==item.TEXT_NODE&&item.nodeType!==item.COMMENT_NODE||item.nodeType===item.TEXT_NODE&&!item.data.match(/^[\s]*$/)})}else{cursor=cursor[p]}p=path.shift()}}};window.deepMap=function deepMap(target,source,map){var value;for(var prop in source){value=source[prop];switch(typeof value){case"string":case"number":case"boolean":if("object"===typeof target){target[prop]=map(value,prop)}break;case"object":if("object"===typeof target){if(Array.isArray(value)){target[prop]=target[prop]||[];deepMap(target[prop],value,map)}else{target[prop]=target[prop]||{};deepMap(target[prop],value,map)}}break;case"function":case"symbol":case"undefined":if("object"===typeof target){target[prop]=value}break;default:if("object"===typeof target){target[prop]=value}break;}}return target};window.translate=function translate(lang,path,text){var result;switch(lang){case"":case"en":case null:case void 0:result=text;break;default:if(!path||path.match(/(textContent|[.]data|[.]text|[.]trim)$/)){result={};deepMap(result,{text:text},function(value,prop){if("string"===typeof value&&!value.match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/)&&!value.match(/^[0-9]{1,}$/)&&"type"!==prop){if(path&&path.match(/[.]trim$/)){return minifyText((lang+" "+value).trim())}else{if(value.match(/^ /)){return minifyText(" "+lang+" "+value)}else{return minifyText(lang+" "+value)}}}return minifyText(value)});result=result.text}else{result=text}}return result};window.minifyText=function minifyText(text){if(text&&"string"===typeof text){text=text.replace(/[\s]{1,}/g," ")}return text};window.isFakeServer="object"===typeof window&&"string"===typeof window.location.href&&0<window.location.href.indexOf("xhr=fake")&&"object"===typeof window.fakeServerContents;window.isSuppressingSuiteParams="object"===typeof window&&"string"===typeof window.location.href&&0<window.location.href.indexOf("suppress=true");window.syntax="mixin";(function(){var href="object"===typeof window&&"string"===typeof window.location.href?window.location.href:"";if(href){["mixin","base-element","thin","legacy","modified-legacy"].forEach(function(_syntax){if(0<href.indexOf("syntax="+_syntax)){syntax=_syntax}})}})();window.setupFakeServer=function setupFakeServer(e){if(isFakeServer){e.server=sinon.fakeServer.create();e.server.autoRespond=!0;e.server.respondImmediately=!0;e.server.respondWith(/\/test\/[-\w]+(\/.*[.]json)$/,function(xhr,urlPath){if(fakeServerContents.hasOwnProperty(urlPath)){xhr.respond(200,{"Content-Type":"application/json"},fakeServerContents[urlPath])}else{xhr.respond(404,{},"")}})}};window.teardownFakeServer=function teardownFakeServer(e){if(isFakeServer){e.server.restore()}};window.setupFixture=function setupFixture(params,fixtureModel){var fixtureName=params.fixture,e=document.querySelector("#"+fixtureName),runningTest=document.querySelectorAll(".running-test"),title=document.querySelector("#test-name"),currentPath=window.location.pathname.split("/");if(!e){throw new Error("Fixture element with id = "+fixtureName+" not found")}if(title){title.textContent=(2<=currentPath.length?currentPath[currentPath.length-2]:"")+(1<=currentPath.length?"/"+currentPath[currentPath.length-1].replace(/-test[.]html$/,"")+"/":"")+params.suite}if("i18n-dom-bind"===e.is){e.parentElement.classList.add("running-test");Array.prototype.forEach.call(runningTest,function(node){if(node!==e.parentElement){node.classList.remove("running-test")}});return new Promise(function(resolve,reject){e.addEventListener("dom-change",function setupFixtureDomChange(ev){if(dom(ev).rootTarget===e){e.removeEventListener("dom-change",setupFixtureDomChange);try{if(fixtureModel&&"string"===typeof fixtureModel.lang&&"en"!==fixtureModel.lang){e.addEventListener("lang-updated",function setupFixtureLangDomChange(event){if(event.target===e&&e.effectiveLang===fixtureModel.lang){e.removeEventListener("lang-updated",setupFixtureLangDomChange);e.render();resolve(e)}});for(var p in fixtureModel){e[p]=fixtureModel[p]}e.params=params}else{for(var p in fixtureModel){e[p]=fixtureModel[p]}e.params=params;e.render();resolve(e)}}catch(ex){reject(ex)}}});if(e._children){e.render()}})}else{e.classList.add("running-test");Array.prototype.forEach.call(runningTest,function(node){if(node!==e){node.classList.remove("running-test")}});setupFakeServer(e);return new Promise(function(resolve,reject){if(!window.FixtureWrapper){window.FixtureWrapper=class FixtureWrapper extends PolymerElement{};customElements.define("fixture-wrapper",FixtureWrapper)}if(fixtureModel){var f=document.querySelector("test-fixture[id="+fixtureName+"]"),t=f.querySelector("template[is=dom-template]");if(t){var instanceProps={},p;for(p in fixtureModel){instanceProps[p]=!0}var self=new FixtureWrapper;t.__templatizeOwner=void 0;t._ctor=templatize(t,self,{instanceProps:instanceProps,forwardHostProp:function(prop,value){if(self._instance){self._instance.forwardHostProp(prop,value)}}});t.stamp=function(model){var _instance=new this._ctor(model);return _instance.root}.bind(t)}}var element=fixture(fixtureName,fixtureModel);if(element){if(fixtureModel&&"string"===typeof fixtureModel.lang&&"en"!==fixtureModel.lang&&fixtureModel.lang!==element.effectiveLang&&"en"!==element.effectiveLang){element.addEventListener("lang-updated",function setupFixtureLangUpdated(event){if(event.target===element&&element.effectiveLang===fixtureModel.lang){element.removeEventListener("lang-updated",setupFixtureLangUpdated);resolve(element)}})}else{setTimeout(function(){if(""===params.lang||"en"===params.lang){element.fire("lang-updated")}},500);resolve(element)}}else{reject(new Error("setupFixture returns null for "+fixtureName+" "+JSON.stringify(fixtureModel,null,2)))}})}};window.restoreFixture=function restoreFixture(fixtureName){var e=document.querySelector("#"+fixtureName);if(!e){throw new Error("Fixture element with id = "+fixtureName+" not found")}if("i18n-dom-bind"===e.is){if(e._intervalId){clearInterval(e._intervalId)}Array.prototype.forEach.call(document.querySelectorAll("i18n-dom-bind"),function(node){node.observeHtmlLang=!0})}else{teardownFakeServer(e);e.restore()}};window.getLocalDomRoot=function getLocalDomRoot(e){if("i18n-dom-bind"===e.is){return e.parentElement}else if(e){return e.root}else{return null}};window.suitesRunner=function suitesRunner(suites,_wait){suites.forEach(function(params){suite(params.suite,function(){var el,p,n,i,j,expected,results,node,rawValue=params.rawValue,fixtureElement,noProperties,lang=params.assign&&params.assign.lang?params.assign.lang:"en",event=params.event?params.event:"lang-updated",defTimeout=3e5,timeout=params.timeout?params.timeout<defTimeout?defTimeout:params.timeout:defTimeout;this.timeout(timeout);(params.setup?setup:suiteSetup)(function(){return(_wait?new Promise(resolve=>{setTimeout(()=>{resolve()},_wait)}):Promise.resolve()).then(()=>setupFixture(params,params.fixtureModel)).then(function(element){el=element;return new Promise(function(resolve,reject){if(params&&(params.event||params.assign&&(params.assign.lang||params.assign["html.lang"]))){el.addEventListener(event,function fixtureSetup(e){if(el===dom(e).rootTarget&&el.lang===params.lang&&el.effectiveLang===params.effectiveLang){el.removeEventListener(event,fixtureSetup);resolve(el)}else{console.log(params.suite+" skipping uninteresting event "+event+" \""+el.lang+"\" \""+params.lang+"\" \""+el.effectiveLang+"\" \""+params.effectiveLang+"\"")}});updateProperty(el,params.assign)}else{updateProperty(el,params.assign);resolve(el)}})},function(error){throw new Error(error)}).then(result=>{if(_wait){return new Promise(resolve=>{setTimeout(()=>resolve(result),_wait)})}else{return result}})});test("{lang, effectiveLang, templateDefaultLang, observeHtmlLang"+(params.text?", text":"")+(params.model?", model":"")+(params.localDOM?", local DOM":"")+"} properties are set as {"+(isSuppressingSuiteParams?"":[params.lang,params.effectiveLang,params.templateDefaultLang,params.observeHtmlLang].join(", ")+(params.text?", "+JSON.stringify(params.text,null,2):"")+(params.model?", "+JSON.stringify(params.model,null,2):"")+(!params.setup&&params.localDOM?", "+JSON.stringify(params.localDOM,null,2):""))+"}"+(params.assign&&params.assign.lang?" for "+params.assign.lang:""),function(){assert.isString(el.lang,"lang property is a string");assert.equal(el.lang,params.lang,"lang property is set");assert.isString(el.effectiveLang,"effectiveLang property is a string");assert.equal(el.effectiveLang,params.effectiveLang,"effectiveLang property is set");assert.isString(el.templateDefaultLang,"templateDefaultLang property is a string");assert.equal(el.templateDefaultLang,params.templateDefaultLang,"templateDefaultLang property is set");assert.isBoolean(el.observeHtmlLang,"observeHtmlLang property is a Boolean");assert.equal(el.observeHtmlLang,params.observeHtmlLang,"observeHtmlLang property is set");if(params.text){var actual;expected=deepMap(deepcopy(params.text),params.text,minifyText);actual=deepMap(deepcopy(el.text),el.text,minifyText);noProperties=!0;assert.isObject(el.text,"text property is an object");for(p in expected){if("meta"===p){continue}noProperties=!1;assert.deepEqual(actual[p],params.rawText?expected[p]:translate(params.effectiveLang,null,expected[p]),"text."+p+" property is set for "+params.effectiveLang)}if(noProperties){assert.deepEqual(deepMap(deepcopy(el.text),el.text,minifyText),expected,"text property is set")}}if(params.model){noProperties=!0;assert.isObject(el.model,"model property is an object");for(p in expected){noProperties=!1;assert.deepEqual(minifyText(el.model[p]),params.rawText?params.model[p]:translate(params.effectiveLang,null,params.model[p]),"model."+p+" property is set for "+params.effectiveLang)}if(noProperties){assert.deepEqual(el.model,params.model,"model property is set")}}if(!params.setup&&params.localDOM){params.localDOM.forEach(function(childPath){var completeStatus,nodes=dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);assert.ok(0<nodes.length,childPath.select+" is defined");for(var p in childPath){if("select"===p){continue}if(Array.isArray(childPath[p])){Array.prototype.forEach.call(childPath[p],function(path,i,a){assert.equal(minifyText(getProperty(nodes[i],p)),minifyText(params.rawText?path:translate(params.effectiveLang,p,path)),p+" is set as "+minifyText(params.rawText?path:translate(params.effectiveLang,p,path)))})}else{assert.equal(minifyText(getProperty(nodes[0],p)),minifyText(params.rawText?childPath[p]:translate(params.effectiveLang,p,childPath[p])),p+" is set as "+translate(params.rawText?childPath[p]:params.effectiveLang,p,childPath[p]))}}})}});if(params.setup&&params.localDOM){test("local DOM "+(isSuppressingSuiteParams?"{}":JSON.stringify(params.localDOM,null,2))+" is set"+(params.assign&&params.assign.lang?" for "+params.assign.lang:""),function(){params.localDOM.forEach(function(childPath){var completeStatus,nodes=dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);assert.ok(0<nodes.length,childPath.select+" is defined");for(var p in childPath){if("select"===p){continue}if(Array.isArray(childPath[p])){Array.prototype.forEach.call(childPath[p],function(path,i,a){assert.equal(minifyText(getProperty(nodes[i],p)),minifyText(params.rawText?path:translate(params.effectiveLang,p,path)),p+" is set as "+minifyText(params.rawText?path:translate(params.effectiveLang,p,path)))})}else{assert.equal(minifyText(getProperty(nodes[0],p)),minifyText(params.rawText?childPath[p]:translate(params.effectiveLang,p,childPath[p])),p+" is set as "+translate(params.rawText?childPath[p]:params.effectiveLang,p,childPath[p]))}}})})}if(params.lightDOM){test("light DOM "+(isSuppressingSuiteParams?"{}":JSON.stringify(params.lightDOM,null,2))+" is set"+(params.assign&&params.assign.lang?" for "+params.assign.lang:""),function(){params.lightDOM.forEach(function(childPath){var completeStatus,nodes=dom(el).querySelectorAll(childPath.select);assert.ok(0<nodes.length,childPath.select+" is defined");for(var p in childPath){if("select"===p){continue}if(Array.isArray(childPath[p])){Array.prototype.forEach.call(childPath[p],function(path,i,a){assert.equal(getProperty(nodes[i],p),translate(params.effectiveLang,p,path),p+" is set as "+translate(params.effectiveLang,p,path))})}else{assert.equal(getProperty(nodes[0],p),translate(params.effectiveLang,p,childPath[p]),p+" is set as "+translate(params.effectiveLang,p,childPath[p]))}}})})}(params.setup?teardown:suiteTeardown)(function(){restoreFixture(params.fixture)})})})};const bundledImportMeta$7={...import.meta,url:new URL("./simple-text-element/simple-text-element.js",import.meta.url).href},$_documentContainer$2=document.createElement("template");$_documentContainer$2.innerHTML=`<template id="simple-text-element">
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
  </template>`;document.head.appendChild($_documentContainer$2.content);switch(syntax){default:case"mixin":{class SimpleTextElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$7}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"simple-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(SimpleTextElement.is,SimpleTextElement)}break;case"base-element":{class SimpleTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$7}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"simple-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(SimpleTextElement.is,SimpleTextElement)}break;case"thin":{Define=class SimpleTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$7}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$7,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`),is:"simple-text-element",behaviors:[BehaviorsStore.I18nBehavior],listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(e){console.log(this.is,"lang-updated",e.detail);if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}}})}break;}const bundledImportMeta$8={...import.meta,url:new URL("./commented-simple-text-element/commented-simple-text-element.js",import.meta.url).href},$_documentContainer$3=document.createElement("template");$_documentContainer$3.innerHTML=`<template id="commented-simple-text-element"><!-- comment -->
    outermost text at the beginning <!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>outermost header 1<!-- comment --></h1><!-- comment -->
    outermost text in the middle <!-- comment -->
    <span>simple text without id<!-- comment --></span><!-- comment -->
    <span>simple text without id 2<!-- comment --></span><!-- comment -->
    <span id="label-1">simple text with id<!-- comment --></span><!-- comment -->
    <span id="label-2">simple text with id 2<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->simple text within div<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->simple text within div 2<!-- comment --></span> <!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>
      simple text as the first element in div <!-- comment -->
      <span>simple text within div<!-- comment --></span><!-- comment -->
      simple text in the middle of div <!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div><!-- comment -->
      simple text at the last element in div
    </div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>simple text within div</span><!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">great grandchild text within div<!-- comment --></div>
        <div>great grandchild text within div without id</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>line item without id 1</li><!-- comment -->
        <li>line item without id 2</li><!-- comment -->
        <li>line item without id 3</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>line item with id 1<!-- comment --></li>
        <li>line item with id 2<!-- comment --></li>
        <li>line item with id 3<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><!-- comment -->A paragraph with <!-- comment --><b>parameters</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p><!-- comment -->
    <p id="paragraph"><!-- comment -->A paragraph with <!-- comment --><b>id</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p>
    outermost text at the end <!-- comment -->
  </template>`;document.head.appendChild($_documentContainer$3.content);switch(syntax){default:case"mixin":{class CommentedSimpleTextElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$8}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
<!-- comment -->{{text.text}}<!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>{{text.h1_3}}<!-- comment --></h1><!-- comment -->{{text.text_4}}<!-- comment -->
    <span>{{text.span_5}}<!-- comment --></span><!-- comment -->
    <span>{{text.span_6}}<!-- comment --></span><!-- comment -->
    <span id="label-1">{{text.label-1}}<!-- comment --></span><!-- comment -->
    <span id="label-2">{{text.label-2}}<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->{{text.div_9:span}}<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->{{text.div_9:span_1}}<!-- comment --></span> <!-- comment -->
      <div><div>{{text.div_9:div_2:div}}</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>{{text.div_10:text}}<!-- comment -->
      <span>{{text.div_10:span_1}}<!-- comment --></span><!-- comment -->{{text.div_10:text_2}}<!-- comment -->
      <span>{{text.div_10:span_3}}</span><!-- comment -->
      <div><div>{{text.div_10:div_4:div}}</div><!-- comment --></div><!-- comment -->{{text.div_10:text_5}}</div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>{{text.toplevel-div:span}}</span><!-- comment -->
      <span>{{text.toplevel-div:span_1}}</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">{{text.third-level-div}}<!-- comment --></div>
        <div>{{text.second-level-div:div_1}}</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>{{text.div_12:ul:li}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_1}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_2}}</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>{{text.line-items:li}}<!-- comment --></li>
        <li>{{text.line-items:li_1}}<!-- comment --></li>
        <li>{{text.line-items:li_2}}<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p><!-- comment -->
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<!-- comment -->
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"commented-simple-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(CommentedSimpleTextElement.is,CommentedSimpleTextElement)}break;case"base-element":{class CommentedSimpleTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$8}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
<!-- comment -->{{text.text}}<!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>{{text.h1_3}}<!-- comment --></h1><!-- comment -->{{text.text_4}}<!-- comment -->
    <span>{{text.span_5}}<!-- comment --></span><!-- comment -->
    <span>{{text.span_6}}<!-- comment --></span><!-- comment -->
    <span id="label-1">{{text.label-1}}<!-- comment --></span><!-- comment -->
    <span id="label-2">{{text.label-2}}<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->{{text.div_9:span}}<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->{{text.div_9:span_1}}<!-- comment --></span> <!-- comment -->
      <div><div>{{text.div_9:div_2:div}}</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>{{text.div_10:text}}<!-- comment -->
      <span>{{text.div_10:span_1}}<!-- comment --></span><!-- comment -->{{text.div_10:text_2}}<!-- comment -->
      <span>{{text.div_10:span_3}}</span><!-- comment -->
      <div><div>{{text.div_10:div_4:div}}</div><!-- comment --></div><!-- comment -->{{text.div_10:text_5}}</div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>{{text.toplevel-div:span}}</span><!-- comment -->
      <span>{{text.toplevel-div:span_1}}</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">{{text.third-level-div}}<!-- comment --></div>
        <div>{{text.second-level-div:div_1}}</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>{{text.div_12:ul:li}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_1}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_2}}</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>{{text.line-items:li}}<!-- comment --></li>
        <li>{{text.line-items:li_1}}<!-- comment --></li>
        <li>{{text.line-items:li_2}}<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p><!-- comment -->
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<!-- comment -->
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"commented-simple-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(CommentedSimpleTextElement.is,CommentedSimpleTextElement)}break;case"thin":{Define=class CommentedSimpleTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$8}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$8,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
<!-- comment -->{{text.text}}<!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>{{text.h1_3}}<!-- comment --></h1><!-- comment -->{{text.text_4}}<!-- comment -->
    <span>{{text.span_5}}<!-- comment --></span><!-- comment -->
    <span>{{text.span_6}}<!-- comment --></span><!-- comment -->
    <span id="label-1">{{text.label-1}}<!-- comment --></span><!-- comment -->
    <span id="label-2">{{text.label-2}}<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->{{text.div_9:span}}<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->{{text.div_9:span_1}}<!-- comment --></span> <!-- comment -->
      <div><div>{{text.div_9:div_2:div}}</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>{{text.div_10:text}}<!-- comment -->
      <span>{{text.div_10:span_1}}<!-- comment --></span><!-- comment -->{{text.div_10:text_2}}<!-- comment -->
      <span>{{text.div_10:span_3}}</span><!-- comment -->
      <div><div>{{text.div_10:div_4:div}}</div><!-- comment --></div><!-- comment -->{{text.div_10:text_5}}</div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>{{text.toplevel-div:span}}</span><!-- comment -->
      <span>{{text.toplevel-div:span_1}}</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">{{text.third-level-div}}<!-- comment --></div>
        <div>{{text.second-level-div:div_1}}</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>{{text.div_12:ul:li}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_1}}</li><!-- comment -->
        <li>{{text.div_12:ul:li_2}}</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>{{text.line-items:li}}<!-- comment --></li>
        <li>{{text.line-items:li_1}}<!-- comment --></li>
        <li>{{text.line-items:li_2}}<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p><!-- comment -->
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<!-- comment -->
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`),is:"commented-simple-text-element",behaviors:[BehaviorsStore.I18nBehavior],listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(e){console.log(this.is,"lang-updated",e.detail);if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}}})}break;}const bundledImportMeta$9={...import.meta,url:new URL("./plural-gender-element/plural-gender-element.js",import.meta.url).href},$_documentContainer$4=document.createElement("template");$_documentContainer$4.innerHTML=`<template id="plural-gender-element">
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered">
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">{{recipients.length}}</i18n-number>
        <span>{{recipients.0.gender}}</span>
        <span>{{sender.name}}</span>
        <span>{{recipients.0.name}}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
  </template>`;document.head.appendChild($_documentContainer$4.content);switch(syntax){default:case"mixin":{class PluralGenderElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$9}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "compound-format-text": [
    {
      "0": "You ({3}) gave no gifts.",
      "1": {
        "male": "You ({3}) gave him ({4}) {5}.",
        "female": "You ({3}) gave her ({4}) {5}.",
        "other": "You ({3}) gave them ({4}) {5}."
      },
      "one": {
        "male": "You ({3}) gave him ({4}) and one other person {5}.",
        "female": "You ({3}) gave her ({4}) and one other person {5}.",
        "other": "You ({3}) gave them ({4}) and one other person {5}."
      },
      "other": "You ({3}) gave them ({4}) and {1} other people gifts."
    },
    "{{recipients.length - 1}}",
    "{{recipients.0.gender}}",
    "{{sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
  ]
}
</json-data>
</template>
`)}static get is(){return"plural-gender-element"}static get properties(){return{sender:{type:Object},recipients:{type:Array}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log("plural-gender-element lang-updated lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}if(this.renderedEffectiveLang===this.effectiveLang||""===this.renderedEffectiveLang&&"en"===this.effectiveLang){this.fire("local-dom-ready")}}_rendered(){console.log("plural-gender-element rendered lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(this.lang===this.effectiveLang){this.fire("local-dom-ready")}else{this.renderedEffectiveLang=this.effectiveLang}}}customElements.define(PluralGenderElement.is,PluralGenderElement)}break;case"base-element":{class PluralGenderElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$9}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "compound-format-text": [
    {
      "0": "You ({3}) gave no gifts.",
      "1": {
        "male": "You ({3}) gave him ({4}) {5}.",
        "female": "You ({3}) gave her ({4}) {5}.",
        "other": "You ({3}) gave them ({4}) {5}."
      },
      "one": {
        "male": "You ({3}) gave him ({4}) and one other person {5}.",
        "female": "You ({3}) gave her ({4}) and one other person {5}.",
        "other": "You ({3}) gave them ({4}) and one other person {5}."
      },
      "other": "You ({3}) gave them ({4}) and {1} other people gifts."
    },
    "{{recipients.length - 1}}",
    "{{recipients.0.gender}}",
    "{{sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
  ]
}
</json-data>
</template>
`)}static get is(){return"plural-gender-element"}static get properties(){return{sender:{type:Object},recipients:{type:Array}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log("plural-gender-element lang-updated lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}if(this.renderedEffectiveLang===this.effectiveLang||""===this.renderedEffectiveLang&&"en"===this.effectiveLang){this.fire("local-dom-ready")}}_rendered(){console.log("plural-gender-element rendered lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(this.lang===this.effectiveLang){this.fire("local-dom-ready")}else{this.renderedEffectiveLang=this.effectiveLang}}}customElements.define(PluralGenderElement.is,PluralGenderElement)}break;case"thin":{Define=class PluralGenderElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$9}static get properties(){return{sender:{type:Object},recipients:{type:Array}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log("plural-gender-element lang-updated lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}if(this.renderedEffectiveLang===this.effectiveLang||""===this.renderedEffectiveLang&&"en"===this.effectiveLang){this.fire("local-dom-ready")}}_rendered(){console.log("plural-gender-element rendered lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(this.lang===this.effectiveLang){this.fire("local-dom-ready")}else{this.renderedEffectiveLang=this.effectiveLang}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$9,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "compound-format-text": [
    {
      "0": "You ({3}) gave no gifts.",
      "1": {
        "male": "You ({3}) gave him ({4}) {5}.",
        "female": "You ({3}) gave her ({4}) {5}.",
        "other": "You ({3}) gave them ({4}) {5}."
      },
      "one": {
        "male": "You ({3}) gave him ({4}) and one other person {5}.",
        "female": "You ({3}) gave her ({4}) and one other person {5}.",
        "other": "You ({3}) gave them ({4}) and one other person {5}."
      },
      "other": "You ({3}) gave them ({4}) and {1} other people gifts."
    },
    "{{recipients.length - 1}}",
    "{{recipients.0.gender}}",
    "{{sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
  ]
}
</json-data>
</template>
`),is:"plural-gender-element",behaviors:[BehaviorsStore.I18nBehavior],properties:{sender:{type:Object},recipients:{type:Array}},listeners:{"lang-updated":"_langUpdated"},_langUpdated:function(e){console.log("plural-gender-element lang-updated lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}if(this.renderedEffectiveLang===this.effectiveLang||""===this.renderedEffectiveLang&&"en"===this.effectiveLang){this.fire("local-dom-ready")}},_rendered:function(){console.log("plural-gender-element rendered lang = "+this.lang+" effectiveLang = "+this.effectiveLang);if(this.lang===this.effectiveLang){this.fire("local-dom-ready")}else{this.renderedEffectiveLang=this.effectiveLang}}})}break;}const bundledImportMeta$a={...import.meta,url:new URL("./simple-attribute-element/text-attribute-element.js",import.meta.url).href},$_documentContainer$5=document.createElement("template");$_documentContainer$5.innerHTML=`<i18n-attr-repo>
  <template id="custom">
    <text-attribute-element custom-text-attr1=""></text-attribute-element>
    <text-attribute-element custom-text-attr2=""></text-attribute-element>
    <text-attribute-element custom-text-attr3=""></text-attribute-element>
    <text-attribute-element custom-text-attr4="$"></text-attribute-element>
    <text-attribute-element custom-text-attr5="$"></text-attribute-element>
    <text-attribute-element i18n-target=""></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,boolean-attr2,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,boolean-attr2,,string-attr=aaa,,type2"></text-attribute-element>
    <text-attribute-element i18n-target2="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target2="type5"></text-attribute-element>
    <text-attribute-element i18n-target3="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target3=""></text-attribute-element>
    <text-attribute-element i18n-target4=""></text-attribute-element>
    <text-attribute-element i18n-target4="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target5=""></text-attribute-element>
    <text-attribute-element i18n-target5="type1"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,,boolean-attr2,,string-attr=aaa"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target=""></text-attribute-element>
    <text-attribute-element i18n-target2="type5"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr="></text-attribute-element>
    <text-attribute-element i18n-target2="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,!boolean-attr2,,string-attr=abc|def,,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,,boolean-attr2,,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target3="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target3=""></text-attribute-element>
    <text-attribute-element i18n-target4=""></text-attribute-element>
    <text-attribute-element i18n-target4="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target5=""></text-attribute-element>
    <text-attribute-element i18n-target5="type1"></text-attribute-element>
    <text-attribute-element i18n-target6="type5"></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr="></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr,boolean-attr2,type1"></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr,boolean-attr2,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target7="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target7="invalid!attr=aaa,typeX"></text-attribute-element>
  </template>
</i18n-attr-repo>
<template id="text-attribute-element">
  <span id="attr1">{{customTextAttr1}}</span>
  <span id="attr2">{{customTextAttr2}}</span>
  <span id="attr3">{{customTextAttr3}}</span>
  <span id="attr4">{{outOfScopeAttr}}</span>
  <span>text</span>
</template>`;document.head.appendChild($_documentContainer$5.content);switch(syntax){default:case"mixin":{class TextAttributeElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$a}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>{{text.span_4}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "span_4": "text"
}
</json-data>
</template>
`)}static get is(){return"text-attribute-element"}static get properties(){return{customTextAttr1:{type:String,reflectToAttribute:!0},customTextAttr2:{type:String,reflectToAttribute:!0},customTextAttr3:{type:String,reflectToAttribute:!0},outOfScopeAttr:{type:String,reflectToAttribute:!0},i18nTarget:{type:String},i18nTarget2:{type:String}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(){this.model=deepcopy(this.text.model)}}customElements.define(TextAttributeElement.is,TextAttributeElement)}break;case"base-element":{class TextAttributeElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$a}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>{{text.span_4}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "span_4": "text"
}
</json-data>
</template>
`)}static get is(){return"text-attribute-element"}static get properties(){return{customTextAttr1:{type:String,reflectToAttribute:!0},customTextAttr2:{type:String,reflectToAttribute:!0},customTextAttr3:{type:String,reflectToAttribute:!0},outOfScopeAttr:{type:String,reflectToAttribute:!0},i18nTarget:{type:String},i18nTarget2:{type:String}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(){this.model=deepcopy(this.text.model)}}customElements.define(TextAttributeElement.is,TextAttributeElement)}break;case"thin":{Define=class TextAttributeElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$a}static get properties(){return{customTextAttr1:{type:String,reflectToAttribute:!0},customTextAttr2:{type:String,reflectToAttribute:!0},customTextAttr3:{type:String,reflectToAttribute:!0},outOfScopeAttr:{type:String,reflectToAttribute:!0},i18nTarget:{type:String},i18nTarget2:{type:String}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(){this.model=deepcopy(this.text.model)}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$a,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>{{text.span_4}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "span_4": "text"
}
</json-data>
</template>
`),is:"text-attribute-element",behaviors:[BehaviorsStore.I18nBehavior],properties:{customTextAttr1:{type:String,reflectToAttribute:!0},customTextAttr2:{type:String,reflectToAttribute:!0},customTextAttr3:{type:String,reflectToAttribute:!0},outOfScopeAttr:{type:String,reflectToAttribute:!0},i18nTarget:{type:String},i18nTarget2:{type:String}},listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(){this.model=deepcopy(this.text.model)}})}break;}const bundledImportMeta$b={...import.meta,url:new URL("./simple-attribute-element/simple-attribute-element.js",import.meta.url).href},$_documentContainer$6=document.createElement("template");$_documentContainer$6.innerHTML=`<template id="simple-attribute-element">
    <style attr="This is not extracted">
    google-chart {
      width: 300px;
    }
    </style>
    <div id="outer-div">
      <div id="ordinary-div" attr="This is not targeted for extraction">text 1</div>

      <input id="standard-input" placeholder="standard HTML5 attribute">
      <input placeholder="standard HTML5 attribute without id">

      <paper-input id="paper-input-element" label="paper-input label" error-message="paper-input error message" placeholder="paper-input placeholder" value="this is not a target">
      </paper-input>

      <paper-input label="paper-input label without id" error-message="paper-input error message without id" placeholder="paper-input placeholder without id" value="this is not a target">
      </paper-input>

      <google-chart type="pie" id="pie-chart" options="{&quot;title&quot;: &quot;Distribution of days in 2001H1&quot;}" cols="[ {&quot;label&quot;: &quot;Month&quot;, &quot;type&quot;: &quot;string&quot;},{&quot;label&quot;: &quot;Days&quot;, &quot;type&quot;: &quot;number&quot;} ]" rows="[ [&quot;Jan&quot;, 31],[&quot;Feb&quot;, 28],[&quot;Mar&quot;, 31],[&quot;Apr&quot;, 30],[&quot;May&quot;, 31],[&quot;Jun&quot;, 30] ]">
      </google-chart>

      <google-chart id="column-chart" type="column" options="{&quot;title&quot;: &quot;Inventory&quot;}" data="[ [&quot;Year&quot;, &quot;Things&quot;, &quot;Stuff&quot;],
                [&quot;2004&quot;, 1000, 400],
                [&quot;2005&quot;, 1170, 460],
                [&quot;2006&quot;, 660, 1120],
                [&quot;2007&quot;, 1030, 540] ]">
      </google-chart>

      <text-attribute-element id="custom-attr" custom-text-attr1="custom text attribute 1" custom-text-attr2="custom text attribute 2" custom-text-attr3="custom text attribute 3" out-of-scope-attr="out of scope attr">
      </text-attribute-element>

      <text-attribute-element id="selective-attr" boolean-attr="" empty-attr="" string-attr="abc" custom-text-attr4="{{text.ordinary-div}} custom-text-attr4 attribute with param {{text.ordinary-div}} and param [[text.ordinary-div]] {{text.ordinary-div}}" custom-text-attr5\$="[[text.ordinary-div]] custom-text-attr5 attribute with param {{or('',text.ordinary-div)}} and param [[text.ordinary-div]]" i18n-target="i18n-target attribute with param {{text.ordinary-div}} and param [[text.ordinary-div]]" i18n-target2="i18n-target2 attribute with param {{or('',text.ordinary-div)}} and param [[text.ordinary-div]]">
      </text-attribute-element>
      <text-attribute-element id="selective-attr2" boolean-attr="" boolean-attr2="" string-attr="aaa" i18n-target="i18n-target attribute 2">
      </text-attribute-element>
      <text-attribute-element id="selective-attr3" i18n-target6="i18n-target6 attribute 2">
      </text-attribute-element>
      <text-attribute-element id="selective-attr4" boolean-attr="" i18n-target6="i18n-target6 attribute 3" i18n-target7="unmatching i18n-target4 attribute">
      </text-attribute-element>
      <text-attribute-element id="selective-attr5" string-attr="xxx" i18n-target7="unmatching i18n-target7 attribute">
      </text-attribute-element>

      <span id="test-json-data-1">{{model.json-data-id.attr1}}</span>
      <span id="test-json-data-2">{{model.json-data-id.i18n-target-attr}}</span>
      <span id="test-json-data-3">{{model.template_2:json-data_1.attr1}}</span>
      <span id="test-json-data-4">{{model.template_2:json-data_1.i18n-target-attr}}</span>

    </div>
    <template>
      <json-data id="json-data-id" attr1="this attr1 is extracted" i18n-target-attr="this attribute is also extracted"></json-data>
      <json-data attr1="this attr1 without id is extracted" i18n-target-attr="this attribute without id is also extracted"></json-data>
    </template>
  </template>`;document.head.appendChild($_documentContainer$6.content);switch(syntax){default:case"mixin":{class SimpleAttributeElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$b}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <style attr="This is not extracted">
    google-chart {
      width: 300px;
    }
    </style>
    <div id="outer-div">
      <div id="ordinary-div" attr="This is not targeted for extraction">{{text.ordinary-div}}</div>

      <input id="standard-input" placeholder="{{model.standard-input.placeholder}}">
      <input placeholder="{{model.outer-div:input_2.placeholder}}">

      <paper-input id="paper-input-element" label="{{model.paper-input-element.label}}" error-message="{{model.paper-input-element.error-message}}" placeholder="{{model.paper-input-element.placeholder}}" value="this is not a target">
      </paper-input>

      <paper-input label="{{model.outer-div:paper-input_4.label}}" error-message="{{model.outer-div:paper-input_4.error-message}}" placeholder="{{model.outer-div:paper-input_4.placeholder}}" value="this is not a target">
      </paper-input>

      <google-chart type="pie" id="pie-chart" options="{{model.pie-chart.options}}" cols="{{model.pie-chart.cols}}" rows="{{model.pie-chart.rows}}">
      </google-chart>

      <google-chart id="column-chart" type="column" options="{{model.column-chart.options}}" data="{{model.column-chart.data}}">
      </google-chart>

      <text-attribute-element id="custom-attr" custom-text-attr1="{{model.custom-attr.custom-text-attr1}}" custom-text-attr2="{{model.custom-attr.custom-text-attr2}}" custom-text-attr3="{{model.custom-attr.custom-text-attr3}}" out-of-scope-attr="out of scope attr">
      </text-attribute-element>

      <text-attribute-element id="selective-attr" boolean-attr="" empty-attr="" string-attr="abc" custom-text-attr4$="{{i18nFormat(model.selective-attr.custom-text-attr4.0,text.ordinary-div,text.ordinary-div,text.ordinary-div,text.ordinary-div)}}" custom-text-attr5$="[[text.ordinary-div]]{{model.selective-attr.custom-text-attr5.1}}{{or('',text.ordinary-div)}}{{model.selective-attr.custom-text-attr5.3}}[[text.ordinary-div]]" i18n-target="{{i18nFormat(model.selective-attr.i18n-target.0,text.ordinary-div,text.ordinary-div)}}" i18n-target2="{{model.selective-attr.i18n-target2.0}}{{or('',text.ordinary-div)}}{{model.selective-attr.i18n-target2.2}}[[text.ordinary-div]]">
      </text-attribute-element>
      <text-attribute-element id="selective-attr2" boolean-attr="" boolean-attr2="" string-attr="aaa" i18n-target="{{model.selective-attr2.i18n-target}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr3" i18n-target6="{{model.selective-attr3.i18n-target6}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr4" boolean-attr="" i18n-target6="{{model.selective-attr4.i18n-target6}}" i18n-target7="unmatching i18n-target4 attribute">
      </text-attribute-element>
      <text-attribute-element id="selective-attr5" string-attr="xxx" i18n-target7="unmatching i18n-target7 attribute">
      </text-attribute-element>

      <span id="test-json-data-1">{{model.json-data-id.attr1}}</span>
      <span id="test-json-data-2">{{model.json-data-id.i18n-target-attr}}</span>
      <span id="test-json-data-3">{{model.template_2:json-data_1.attr1}}</span>
      <span id="test-json-data-4">{{model.template_2:json-data_1.i18n-target-attr}}</span>

    </div>
    <template>
      <json-data id="json-data-id" attr1="{{model.json-data-id.attr1}}" i18n-target-attr="{{model.json-data-id.i18n-target-attr}}"></json-data>
      <json-data attr1="{{model.template_2:json-data_1.attr1}}" i18n-target-attr="{{model.template_2:json-data_1.i18n-target-attr}}"></json-data>
    </template>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "standard-input": {
      "placeholder": "standard HTML5 attribute"
    },
    "outer-div:input_2": {
      "placeholder": "standard HTML5 attribute without id"
    },
    "paper-input-element": {
      "label": "paper-input label",
      "error-message": "paper-input error message",
      "placeholder": "paper-input placeholder"
    },
    "outer-div:paper-input_4": {
      "label": "paper-input label without id",
      "error-message": "paper-input error message without id",
      "placeholder": "paper-input placeholder without id"
    },
    "pie-chart": {
      "options": {
        "title": "Distribution of days in 2001H1"
      },
      "cols": [
        {
          "label": "Month",
          "type": "string"
        },
        {
          "label": "Days",
          "type": "number"
        }
      ],
      "rows": [
        [
          "Jan",
          31
        ],
        [
          "Feb",
          28
        ],
        [
          "Mar",
          31
        ],
        [
          "Apr",
          30
        ],
        [
          "May",
          31
        ],
        [
          "Jun",
          30
        ]
      ]
    },
    "column-chart": {
      "options": {
        "title": "Inventory"
      },
      "data": [
        [
          "Year",
          "Things",
          "Stuff"
        ],
        [
          "2004",
          1000,
          400
        ],
        [
          "2005",
          1170,
          460
        ],
        [
          "2006",
          660,
          1120
        ],
        [
          "2007",
          1030,
          540
        ]
      ]
    },
    "custom-attr": {
      "custom-text-attr1": "custom text attribute 1",
      "custom-text-attr2": "custom text attribute 2",
      "custom-text-attr3": "custom text attribute 3"
    },
    "selective-attr": {
      "custom-text-attr4": [
        "{1} custom-text-attr4 attribute with param {2} and param {3} {4}",
        "{{text.ordinary-div}}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]",
        "{{text.ordinary-div}}"
      ],
      "custom-text-attr5": [
        "[[text.ordinary-div]]",
        " custom-text-attr5 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ],
      "i18n-target": [
        "i18n-target attribute with param {1} and param {2}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]"
      ],
      "i18n-target2": [
        "i18n-target2 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ]
    },
    "selective-attr2": {
      "i18n-target": "i18n-target attribute 2"
    },
    "selective-attr3": {
      "i18n-target6": "i18n-target6 attribute 2"
    },
    "selective-attr4": {
      "i18n-target6": "i18n-target6 attribute 3"
    },
    "json-data-id": {
      "attr1": "this attr1 is extracted",
      "i18n-target-attr": "this attribute is also extracted"
    },
    "template_2:json-data_1": {
      "attr1": "this attr1 without id is extracted",
      "i18n-target-attr": "this attribute without id is also extracted"
    }
  },
  "ordinary-div": "text 1"
}
</json-data>
</template>
`)}static get is(){return"simple-attribute-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}connectedCallback(){super.connectedCallback();this._intervalId=window.setInterval(this._checkChartStatus.bind(this),1e3);setTimeout(function(){this.isPieChartRendered=!0;this.isColumnChartRendered=!0;window.clearInterval(this._intervalId);this.fire("local-dom-ready")}.bind(this),200)}disconnectedCallback(){super.disconnectedCallback()}_checkChartStatus(){var pieChartInnerHtml=this.$["pie-chart"].$.chartdiv.innerHTML,columnChartInnerHtml=this.$["column-chart"].$.chartdiv.innerHTML,notLoaded=!1;if("Undefined chart type"===pieChartInnerHtml){this.isPieChartRendered=!0}if("Undefined chart type"===columnChartInnerHtml){this.isColumnChartRendered=!0}if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_langUpdated(e){console.log("_langUpdated");if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}_pieChartRendered(){this.isPieChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_columnChartRendered(){this.isColumnChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}}customElements.define(SimpleAttributeElement.is,SimpleAttributeElement)}break;case"base-element":{class SimpleAttributeElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$b}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <style attr="This is not extracted">
    google-chart {
      width: 300px;
    }
    </style>
    <div id="outer-div">
      <div id="ordinary-div" attr="This is not targeted for extraction">{{text.ordinary-div}}</div>

      <input id="standard-input" placeholder="{{model.standard-input.placeholder}}">
      <input placeholder="{{model.outer-div:input_2.placeholder}}">

      <paper-input id="paper-input-element" label="{{model.paper-input-element.label}}" error-message="{{model.paper-input-element.error-message}}" placeholder="{{model.paper-input-element.placeholder}}" value="this is not a target">
      </paper-input>

      <paper-input label="{{model.outer-div:paper-input_4.label}}" error-message="{{model.outer-div:paper-input_4.error-message}}" placeholder="{{model.outer-div:paper-input_4.placeholder}}" value="this is not a target">
      </paper-input>

      <google-chart type="pie" id="pie-chart" options="{{model.pie-chart.options}}" cols="{{model.pie-chart.cols}}" rows="{{model.pie-chart.rows}}">
      </google-chart>

      <google-chart id="column-chart" type="column" options="{{model.column-chart.options}}" data="{{model.column-chart.data}}">
      </google-chart>

      <text-attribute-element id="custom-attr" custom-text-attr1="{{model.custom-attr.custom-text-attr1}}" custom-text-attr2="{{model.custom-attr.custom-text-attr2}}" custom-text-attr3="{{model.custom-attr.custom-text-attr3}}" out-of-scope-attr="out of scope attr">
      </text-attribute-element>

      <text-attribute-element id="selective-attr" boolean-attr="" empty-attr="" string-attr="abc" custom-text-attr4$="{{i18nFormat(model.selective-attr.custom-text-attr4.0,text.ordinary-div,text.ordinary-div,text.ordinary-div,text.ordinary-div)}}" custom-text-attr5$="[[text.ordinary-div]]{{model.selective-attr.custom-text-attr5.1}}{{or('',text.ordinary-div)}}{{model.selective-attr.custom-text-attr5.3}}[[text.ordinary-div]]" i18n-target="{{i18nFormat(model.selective-attr.i18n-target.0,text.ordinary-div,text.ordinary-div)}}" i18n-target2="{{model.selective-attr.i18n-target2.0}}{{or('',text.ordinary-div)}}{{model.selective-attr.i18n-target2.2}}[[text.ordinary-div]]">
      </text-attribute-element>
      <text-attribute-element id="selective-attr2" boolean-attr="" boolean-attr2="" string-attr="aaa" i18n-target="{{model.selective-attr2.i18n-target}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr3" i18n-target6="{{model.selective-attr3.i18n-target6}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr4" boolean-attr="" i18n-target6="{{model.selective-attr4.i18n-target6}}" i18n-target7="unmatching i18n-target4 attribute">
      </text-attribute-element>
      <text-attribute-element id="selective-attr5" string-attr="xxx" i18n-target7="unmatching i18n-target7 attribute">
      </text-attribute-element>

      <span id="test-json-data-1">{{model.json-data-id.attr1}}</span>
      <span id="test-json-data-2">{{model.json-data-id.i18n-target-attr}}</span>
      <span id="test-json-data-3">{{model.template_2:json-data_1.attr1}}</span>
      <span id="test-json-data-4">{{model.template_2:json-data_1.i18n-target-attr}}</span>

    </div>
    <template>
      <json-data id="json-data-id" attr1="{{model.json-data-id.attr1}}" i18n-target-attr="{{model.json-data-id.i18n-target-attr}}"></json-data>
      <json-data attr1="{{model.template_2:json-data_1.attr1}}" i18n-target-attr="{{model.template_2:json-data_1.i18n-target-attr}}"></json-data>
    </template>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "standard-input": {
      "placeholder": "standard HTML5 attribute"
    },
    "outer-div:input_2": {
      "placeholder": "standard HTML5 attribute without id"
    },
    "paper-input-element": {
      "label": "paper-input label",
      "error-message": "paper-input error message",
      "placeholder": "paper-input placeholder"
    },
    "outer-div:paper-input_4": {
      "label": "paper-input label without id",
      "error-message": "paper-input error message without id",
      "placeholder": "paper-input placeholder without id"
    },
    "pie-chart": {
      "options": {
        "title": "Distribution of days in 2001H1"
      },
      "cols": [
        {
          "label": "Month",
          "type": "string"
        },
        {
          "label": "Days",
          "type": "number"
        }
      ],
      "rows": [
        [
          "Jan",
          31
        ],
        [
          "Feb",
          28
        ],
        [
          "Mar",
          31
        ],
        [
          "Apr",
          30
        ],
        [
          "May",
          31
        ],
        [
          "Jun",
          30
        ]
      ]
    },
    "column-chart": {
      "options": {
        "title": "Inventory"
      },
      "data": [
        [
          "Year",
          "Things",
          "Stuff"
        ],
        [
          "2004",
          1000,
          400
        ],
        [
          "2005",
          1170,
          460
        ],
        [
          "2006",
          660,
          1120
        ],
        [
          "2007",
          1030,
          540
        ]
      ]
    },
    "custom-attr": {
      "custom-text-attr1": "custom text attribute 1",
      "custom-text-attr2": "custom text attribute 2",
      "custom-text-attr3": "custom text attribute 3"
    },
    "selective-attr": {
      "custom-text-attr4": [
        "{1} custom-text-attr4 attribute with param {2} and param {3} {4}",
        "{{text.ordinary-div}}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]",
        "{{text.ordinary-div}}"
      ],
      "custom-text-attr5": [
        "[[text.ordinary-div]]",
        " custom-text-attr5 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ],
      "i18n-target": [
        "i18n-target attribute with param {1} and param {2}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]"
      ],
      "i18n-target2": [
        "i18n-target2 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ]
    },
    "selective-attr2": {
      "i18n-target": "i18n-target attribute 2"
    },
    "selective-attr3": {
      "i18n-target6": "i18n-target6 attribute 2"
    },
    "selective-attr4": {
      "i18n-target6": "i18n-target6 attribute 3"
    },
    "json-data-id": {
      "attr1": "this attr1 is extracted",
      "i18n-target-attr": "this attribute is also extracted"
    },
    "template_2:json-data_1": {
      "attr1": "this attr1 without id is extracted",
      "i18n-target-attr": "this attribute without id is also extracted"
    }
  },
  "ordinary-div": "text 1"
}
</json-data>
</template>
`)}static get is(){return"simple-attribute-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}connectedCallback(){super.connectedCallback();this._intervalId=window.setInterval(this._checkChartStatus.bind(this),1e3);setTimeout(function(){this.isPieChartRendered=!0;this.isColumnChartRendered=!0;window.clearInterval(this._intervalId);this.fire("local-dom-ready")}.bind(this),200)}disconnectedCallback(){super.disconnectedCallback()}_checkChartStatus(){var pieChartInnerHtml=this.$["pie-chart"].$.chartdiv.innerHTML,columnChartInnerHtml=this.$["column-chart"].$.chartdiv.innerHTML,notLoaded=!1;if("Undefined chart type"===pieChartInnerHtml){this.isPieChartRendered=!0}if("Undefined chart type"===columnChartInnerHtml){this.isColumnChartRendered=!0}if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_langUpdated(e){if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}_pieChartRendered(){this.isPieChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_columnChartRendered(){this.isColumnChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}}customElements.define(SimpleAttributeElement.is,SimpleAttributeElement)}break;case"thin":{Define=class SimpleAttributeElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$b}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}connectedCallback(){super.connectedCallback();this._intervalId=window.setInterval(this._checkChartStatus.bind(this),1e3);setTimeout(function(){this.isPieChartRendered=!0;this.isColumnChartRendered=!0;window.clearInterval(this._intervalId);this.fire("local-dom-ready")}.bind(this),200)}disconnectedCallback(){super.disconnectedCallback()}_checkChartStatus(){var pieChartInnerHtml=this.$["pie-chart"].$.chartdiv.innerHTML,columnChartInnerHtml=this.$["column-chart"].$.chartdiv.innerHTML,notLoaded=!1;if("Undefined chart type"===pieChartInnerHtml){this.isPieChartRendered=!0}if("Undefined chart type"===columnChartInnerHtml){this.isColumnChartRendered=!0}if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_langUpdated(e){if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}_pieChartRendered(){this.isPieChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}_columnChartRendered(){this.isColumnChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$b,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`
    <style attr="This is not extracted">
    google-chart {
      width: 300px;
    }
    </style>
    <div id="outer-div">
      <div id="ordinary-div" attr="This is not targeted for extraction">{{text.ordinary-div}}</div>

      <input id="standard-input" placeholder="{{model.standard-input.placeholder}}">
      <input placeholder="{{model.outer-div:input_2.placeholder}}">

      <paper-input id="paper-input-element" label="{{model.paper-input-element.label}}" error-message="{{model.paper-input-element.error-message}}" placeholder="{{model.paper-input-element.placeholder}}" value="this is not a target">
      </paper-input>

      <paper-input label="{{model.outer-div:paper-input_4.label}}" error-message="{{model.outer-div:paper-input_4.error-message}}" placeholder="{{model.outer-div:paper-input_4.placeholder}}" value="this is not a target">
      </paper-input>

      <google-chart type="pie" id="pie-chart" options="{{model.pie-chart.options}}" cols="{{model.pie-chart.cols}}" rows="{{model.pie-chart.rows}}">
      </google-chart>

      <google-chart id="column-chart" type="column" options="{{model.column-chart.options}}" data="{{model.column-chart.data}}">
      </google-chart>

      <text-attribute-element id="custom-attr" custom-text-attr1="{{model.custom-attr.custom-text-attr1}}" custom-text-attr2="{{model.custom-attr.custom-text-attr2}}" custom-text-attr3="{{model.custom-attr.custom-text-attr3}}" out-of-scope-attr="out of scope attr">
      </text-attribute-element>

      <text-attribute-element id="selective-attr" boolean-attr="" empty-attr="" string-attr="abc" custom-text-attr4$="{{i18nFormat(model.selective-attr.custom-text-attr4.0,text.ordinary-div,text.ordinary-div,text.ordinary-div,text.ordinary-div)}}" custom-text-attr5$="[[text.ordinary-div]]{{model.selective-attr.custom-text-attr5.1}}{{or('',text.ordinary-div)}}{{model.selective-attr.custom-text-attr5.3}}[[text.ordinary-div]]" i18n-target="{{i18nFormat(model.selective-attr.i18n-target.0,text.ordinary-div,text.ordinary-div)}}" i18n-target2="{{model.selective-attr.i18n-target2.0}}{{or('',text.ordinary-div)}}{{model.selective-attr.i18n-target2.2}}[[text.ordinary-div]]">
      </text-attribute-element>
      <text-attribute-element id="selective-attr2" boolean-attr="" boolean-attr2="" string-attr="aaa" i18n-target="{{model.selective-attr2.i18n-target}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr3" i18n-target6="{{model.selective-attr3.i18n-target6}}">
      </text-attribute-element>
      <text-attribute-element id="selective-attr4" boolean-attr="" i18n-target6="{{model.selective-attr4.i18n-target6}}" i18n-target7="unmatching i18n-target4 attribute">
      </text-attribute-element>
      <text-attribute-element id="selective-attr5" string-attr="xxx" i18n-target7="unmatching i18n-target7 attribute">
      </text-attribute-element>

      <span id="test-json-data-1">{{model.json-data-id.attr1}}</span>
      <span id="test-json-data-2">{{model.json-data-id.i18n-target-attr}}</span>
      <span id="test-json-data-3">{{model.template_2:json-data_1.attr1}}</span>
      <span id="test-json-data-4">{{model.template_2:json-data_1.i18n-target-attr}}</span>

    </div>
    <template>
      <json-data id="json-data-id" attr1="{{model.json-data-id.attr1}}" i18n-target-attr="{{model.json-data-id.i18n-target-attr}}"></json-data>
      <json-data attr1="{{model.template_2:json-data_1.attr1}}" i18n-target-attr="{{model.template_2:json-data_1.i18n-target-attr}}"></json-data>
    </template>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "standard-input": {
      "placeholder": "standard HTML5 attribute"
    },
    "outer-div:input_2": {
      "placeholder": "standard HTML5 attribute without id"
    },
    "paper-input-element": {
      "label": "paper-input label",
      "error-message": "paper-input error message",
      "placeholder": "paper-input placeholder"
    },
    "outer-div:paper-input_4": {
      "label": "paper-input label without id",
      "error-message": "paper-input error message without id",
      "placeholder": "paper-input placeholder without id"
    },
    "pie-chart": {
      "options": {
        "title": "Distribution of days in 2001H1"
      },
      "cols": [
        {
          "label": "Month",
          "type": "string"
        },
        {
          "label": "Days",
          "type": "number"
        }
      ],
      "rows": [
        [
          "Jan",
          31
        ],
        [
          "Feb",
          28
        ],
        [
          "Mar",
          31
        ],
        [
          "Apr",
          30
        ],
        [
          "May",
          31
        ],
        [
          "Jun",
          30
        ]
      ]
    },
    "column-chart": {
      "options": {
        "title": "Inventory"
      },
      "data": [
        [
          "Year",
          "Things",
          "Stuff"
        ],
        [
          "2004",
          1000,
          400
        ],
        [
          "2005",
          1170,
          460
        ],
        [
          "2006",
          660,
          1120
        ],
        [
          "2007",
          1030,
          540
        ]
      ]
    },
    "custom-attr": {
      "custom-text-attr1": "custom text attribute 1",
      "custom-text-attr2": "custom text attribute 2",
      "custom-text-attr3": "custom text attribute 3"
    },
    "selective-attr": {
      "custom-text-attr4": [
        "{1} custom-text-attr4 attribute with param {2} and param {3} {4}",
        "{{text.ordinary-div}}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]",
        "{{text.ordinary-div}}"
      ],
      "custom-text-attr5": [
        "[[text.ordinary-div]]",
        " custom-text-attr5 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ],
      "i18n-target": [
        "i18n-target attribute with param {1} and param {2}",
        "{{text.ordinary-div}}",
        "[[text.ordinary-div]]"
      ],
      "i18n-target2": [
        "i18n-target2 attribute with param ",
        "{{or('',text.ordinary-div)}}",
        " and param ",
        "[[text.ordinary-div]]"
      ]
    },
    "selective-attr2": {
      "i18n-target": "i18n-target attribute 2"
    },
    "selective-attr3": {
      "i18n-target6": "i18n-target6 attribute 2"
    },
    "selective-attr4": {
      "i18n-target6": "i18n-target6 attribute 3"
    },
    "json-data-id": {
      "attr1": "this attr1 is extracted",
      "i18n-target-attr": "this attribute is also extracted"
    },
    "template_2:json-data_1": {
      "attr1": "this attr1 without id is extracted",
      "i18n-target-attr": "this attribute without id is also extracted"
    }
  },
  "ordinary-div": "text 1"
}
</json-data>
</template>
`),is:"simple-attribute-element",behaviors:[BehaviorsStore.I18nBehavior],listeners:{"lang-updated":"_langUpdated","pie-chart.google-chart-render":"_pieChartRendered","column-chart.google-chart-render":"_columnChartRendered"},ready:function(){},attached:function(){this._intervalId=window.setInterval(this._checkChartStatus.bind(this),1e3);setTimeout(function(){this.isPieChartRendered=!0;this.isColumnChartRendered=!0;window.clearInterval(this._intervalId);this.fire("local-dom-ready")}.bind(this),200)},_checkChartStatus:function(){var pieChartInnerHtml=this.$["pie-chart"].$.chartdiv.innerHTML,columnChartInnerHtml=this.$["column-chart"].$.chartdiv.innerHTML,notLoaded=!1;if("Undefined chart type"===pieChartInnerHtml){this.isPieChartRendered=!0}if("Undefined chart type"===columnChartInnerHtml){this.isColumnChartRendered=!0}if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}},_langUpdated:function(e){if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}},_pieChartRendered:function(){this.isPieChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}},_columnChartRendered:function(){this.isColumnChartRendered=!0;if(this.isPieChartRendered&&this.isColumnChartRendered){window.clearInterval(this._intervalId);this.fire("local-dom-ready")}}})}break;}const bundledImportMeta$c={...import.meta,url:new URL("./fallback-text-element/fallback-text-element.js",import.meta.url).href},$_documentContainer$7=document.createElement("template");$_documentContainer$7.innerHTML=`<template id="fallback-text-element">
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
  </template>`;document.head.appendChild($_documentContainer$7.content);switch(syntax){default:case"mixin":{class FallbackTextElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$c}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"fallback-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(FallbackTextElement.is,FallbackTextElement)}break;case"base-element":{class FallbackTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$c}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"fallback-text-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(FallbackTextElement.is,FallbackTextElement)}break;case"thin":{Define=class FallbackTextElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$c}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$c,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "third-level-div": "great grandchild text within div",
  "second-level-div:div_1": "great grandchild text within div without id",
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items:li": "line item with id 1",
  "line-items:li_1": "line item with id 2",
  "line-items:li_2": "line item with id 3",
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`),is:"fallback-text-element",behaviors:[BehaviorsStore.I18nBehavior],listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(e){console.log(this.is,"lang-updated",e.detail);if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}}})}break;}const bundledImportMeta$d={...import.meta,url:new URL("./compound-binding-element/compound-binding-element.js",import.meta.url).href},$_documentContainer$8=document.createElement("template");$_documentContainer$8.innerHTML=`<template id="compound-binding-element">
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
  </template>`;document.head.appendChild($_documentContainer$8.content);switch(syntax){default:case"mixin":{class CompoundBindingElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$d}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`<i18n-format lang="{{effectiveLang}}"><span>{{text.text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1><i18n-format lang="{{effectiveLang}}"><span>{{text.h1_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></h1><i18n-format lang="{{effectiveLang}}"><span>{{text.text_4.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_6.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-1"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-2"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <div>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:div_2:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div> 
    </div>
    <div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:div_4:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
    <div id="toplevel-div">
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div id="second-level-div">
        <div id="third-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.third-level-div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
        <div><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div:div_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
      </div>
    </div>
    <div>
      <ul>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
      <ul id="line-items">
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><span slot="2">{{param1}}</span><span slot="3">{{param2}}</span><code slot="4">{{text.paragraph.4}}</code></i18n-format></p><i18n-format lang="{{effectiveLang}}"><span>{{text.text_15.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": [
    " outermost text at the beginning with compound {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "h1_3": [
    "outermost header 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "text_4": [
    " outermost text in the middle with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_5": [
    "simple text without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_6": [
    "simple text without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-1": [
    "simple text with id and {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-2": [
    "simple text with id and {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span_1": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:div_2:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text": [
    " simple text as the first element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_1": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_2": [
    " simple text in the middle of div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_3": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:div_4:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_5": [
    " simple text at the last element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span_1": [
    "simple text within div 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "third-level-div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "second-level-div:div_1": [
    "great grandchild text within div without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li": [
    "line item without id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_1": [
    "line item without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_2": [
    "line item without id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li": [
    "line item with id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_1": [
    "line item with id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_2": [
    "line item with id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "{{param1}}",
    "{{param2}}"
  ],
  "paragraph": [
    "A paragraph with {1}, {2}, and {3} is converted to {4}.",
    "id",
    "{{param1}}",
    "{{param2}}",
    "&lt;i18n-format&gt;"
  ],
  "text_15": [
    " outermost text at the end with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ]
}
</json-data>
</template>
`)}static get is(){return"compound-binding-element"}static get properties(){return{param1:{type:String,value:"parameter 1"},param2:{type:String,value:"parameter 2"}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(CompoundBindingElement.is,CompoundBindingElement)}break;case"base-element":{class CompoundBindingElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$d}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`<i18n-format lang="{{effectiveLang}}"><span>{{text.text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1><i18n-format lang="{{effectiveLang}}"><span>{{text.h1_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></h1><i18n-format lang="{{effectiveLang}}"><span>{{text.text_4.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_6.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-1"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-2"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <div>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:div_2:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div> 
    </div>
    <div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:div_4:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
    <div id="toplevel-div">
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div id="second-level-div">
        <div id="third-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.third-level-div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
        <div><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div:div_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
      </div>
    </div>
    <div>
      <ul>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
      <ul id="line-items">
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><span slot="2">{{param1}}</span><span slot="3">{{param2}}</span><code slot="4">{{text.paragraph.4}}</code></i18n-format></p><i18n-format lang="{{effectiveLang}}"><span>{{text.text_15.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": [
    " outermost text at the beginning with compound {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "h1_3": [
    "outermost header 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "text_4": [
    " outermost text in the middle with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_5": [
    "simple text without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_6": [
    "simple text without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-1": [
    "simple text with id and {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-2": [
    "simple text with id and {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span_1": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:div_2:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text": [
    " simple text as the first element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_1": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_2": [
    " simple text in the middle of div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_3": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:div_4:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_5": [
    " simple text at the last element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span_1": [
    "simple text within div 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "third-level-div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "second-level-div:div_1": [
    "great grandchild text within div without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li": [
    "line item without id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_1": [
    "line item without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_2": [
    "line item without id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li": [
    "line item with id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_1": [
    "line item with id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_2": [
    "line item with id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "{{param1}}",
    "{{param2}}"
  ],
  "paragraph": [
    "A paragraph with {1}, {2}, and {3} is converted to {4}.",
    "id",
    "{{param1}}",
    "{{param2}}",
    "&lt;i18n-format&gt;"
  ],
  "text_15": [
    " outermost text at the end with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ]
}
</json-data>
</template>
`)}static get is(){return"compound-binding-element"}static get properties(){return{param1:{type:String,value:"parameter 1"},param2:{type:String,value:"parameter 2"}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(CompoundBindingElement.is,CompoundBindingElement)}break;case"thin":{Define=class CompoundBindingElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$d}static get properties(){return{param1:{type:String,value:"parameter 1"},param2:{type:String,value:"parameter 2"}}}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$d,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`<i18n-format lang="{{effectiveLang}}"><span>{{text.text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1><i18n-format lang="{{effectiveLang}}"><span>{{text.h1_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></h1><i18n-format lang="{{effectiveLang}}"><span>{{text.text_4.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_6.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-1"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <span id="label-2"><i18n-format lang="{{effectiveLang}}"><span>{{text.label-2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
    <div>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span> 
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_9:div_2:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div> 
    </div>
    <div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><span><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:span_3.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div><div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:div_4:div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div></div><i18n-format lang="{{effectiveLang}}"><span>{{text.div_10:text_5.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
    <div id="toplevel-div">
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <span><i18n-format lang="{{effectiveLang}}"><span>{{text.toplevel-div:span_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></span>
      <div id="second-level-div">
        <div id="third-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.third-level-div.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
        <div><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div:div_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></div>
      </div>
    </div>
    <div>
      <ul>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.div_12:ul:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
      <ul id="line-items">
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_1.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
        <li><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items:li_2.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><span slot="2">{{param1}}</span><span slot="3">{{param2}}</span><code slot="4">{{text.paragraph.4}}</code></i18n-format></p><i18n-format lang="{{effectiveLang}}"><span>{{text.text_15.0}}</span><span slot="1">{{param1}}</span><span slot="2">{{param2}}</span></i18n-format><template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": [
    " outermost text at the beginning with compound {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "h1_3": [
    "outermost header 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "text_4": [
    " outermost text in the middle with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_5": [
    "simple text without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "span_6": [
    "simple text without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-1": [
    "simple text with id and {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "label-2": [
    "simple text with id and {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:span_1": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_9:div_2:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text": [
    " simple text as the first element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_1": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_2": [
    " simple text in the middle of div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:span_3": [
    "simple text within div with {1} and {2} variables 2",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:div_4:div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_10:text_5": [
    " simple text at the last element in div with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span": [
    "simple text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "toplevel-div:span_1": [
    "simple text within div 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "third-level-div": [
    "great grandchild text within div with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "second-level-div:div_1": [
    "great grandchild text within div without id with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li": [
    "line item without id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_1": [
    "line item without id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "div_12:ul:li_2": [
    "line item without id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li": [
    "line item with id 1 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_1": [
    "line item with id 2 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "line-items:li_2": [
    "line item with id 3 with {1} and {2} variables",
    "{{param1}}",
    "{{param2}}"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "{{param1}}",
    "{{param2}}"
  ],
  "paragraph": [
    "A paragraph with {1}, {2}, and {3} is converted to {4}.",
    "id",
    "{{param1}}",
    "{{param2}}",
    "&lt;i18n-format&gt;"
  ],
  "text_15": [
    " outermost text at the end with {1} and {2} variables ",
    "{{param1}}",
    "{{param2}}"
  ]
}
</json-data>
</template>
`),is:"compound-binding-element",behaviors:[BehaviorsStore.I18nBehavior],properties:{param1:{type:String,value:"parameter 1"},param2:{type:String,value:"parameter 2"}},listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(e){console.log(this.is,"lang-updated",e.detail);if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}}})}break;}const bundledImportMeta$e={...import.meta,url:new URL("./simple-text-id-element/simple-text-id-element.js",import.meta.url).href},$_documentContainer$9=document.createElement("template");$_documentContainer$9.innerHTML=`<template id="simple-text-id-element">
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span text-id="label-1">simple text with id</span>
    <span text-id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div text-id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div text-id="second-level-div">
        <div text-id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul text-id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p text-id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
  </template>`;document.head.appendChild($_documentContainer$9.content);switch(syntax){default:case"mixin":{class SimpleTextIdElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)){static get importMeta(){return bundledImportMeta$e}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span text-id="label-1">{{text.label-1}}</span>
    <span text-id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div text-id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div text-id="second-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div.0}}</span><div text-id="third-level-div" slot="1">{{text.second-level-div.1}}</div><div slot="2">{{text.second-level-div.2}}</div></i18n-format></div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul text-id="line-items"><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items.0}}</span><li slot="1">{{text.line-items.1}}</li><li slot="2">{{text.line-items.2}}</li><li slot="3">{{text.line-items.3}}</li></i18n-format></ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p text-id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "second-level-div": [
    " {1}\\n        {2} ",
    "great grandchild text within div",
    "great grandchild text within div without id"
  ],
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items": [
    " {1}\\n        {2}\\n        {3} ",
    "line item with id 1",
    "line item with id 2",
    "line item with id 3"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"simple-text-id-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(SimpleTextIdElement.is,SimpleTextIdElement)}break;case"base-element":{class SimpleTextIdElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$e}static get template(){return(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span text-id="label-1">{{text.label-1}}</span>
    <span text-id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div text-id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div text-id="second-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div.0}}</span><div text-id="third-level-div" slot="1">{{text.second-level-div.1}}</div><div slot="2">{{text.second-level-div.2}}</div></i18n-format></div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul text-id="line-items"><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items.0}}</span><li slot="1">{{text.line-items.1}}</li><li slot="2">{{text.line-items.2}}</li><li slot="3">{{text.line-items.3}}</li></i18n-format></ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p text-id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "second-level-div": [
    " {1}\\n        {2} ",
    "great grandchild text within div",
    "great grandchild text within div without id"
  ],
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items": [
    " {1}\\n        {2}\\n        {3} ",
    "line item with id 1",
    "line item with id 2",
    "line item with id 3"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`)}static get is(){return"simple-text-id-element"}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}customElements.define(SimpleTextIdElement.is,SimpleTextIdElement)}break;case"thin":{Define=class SimpleTextIdElement extends BaseElements.I18nElement{static get importMeta(){return bundledImportMeta$e}ready(){this.addEventListener("lang-updated",this._langUpdated);super.ready()}_langUpdated(e){console.log(this.is,"lang-updated",e.detail);if(e.composedPath()[0]===this){this.model=deepcopy(this.text.model)}}}}break;case"legacy":{Polymer({importMeta:bundledImportMeta$e,_template:(t=>{t.setAttribute("localizable-text","embedded");return t})(html`{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span text-id="label-1">{{text.label-1}}</span>
    <span text-id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div text-id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div text-id="second-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div.0}}</span><div text-id="third-level-div" slot="1">{{text.second-level-div.1}}</div><div slot="2">{{text.second-level-div.2}}</div></i18n-format></div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul text-id="line-items"><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items.0}}</span><li slot="1">{{text.line-items.1}}</li><li slot="2">{{text.line-items.2}}</li><li slot="3">{{text.line-items.3}}</li></i18n-format></ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p text-id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "second-level-div": [
    " {1}\\n        {2} ",
    "great grandchild text within div",
    "great grandchild text within div without id"
  ],
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items": [
    " {1}\\n        {2}\\n        {3} ",
    "line item with id 1",
    "line item with id 2",
    "line item with id 3"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
}
</json-data>
</template>
`),is:"simple-text-id-element",behaviors:[BehaviorsStore.I18nBehavior],listeners:{"lang-updated":"_langUpdated"},ready:function(){},attached:function(){},_langUpdated:function(e){console.log(this.is,"lang-updated",e.detail);if(dom(e).rootTarget===this){this.model=deepcopy(this.text.model)}}})}break;}let intervalId=setInterval(function(){var bind=document.querySelector("#simple-attribute-dom-bind");if(bind){clearInterval(intervalId)}else{return}bind.addEventListener("dom-change",function onDomChangeForBind(event){if(!bind.done&&event.target===bind){bind._langUpdated=function(e){if(e.composedPath()[0]===this){console.log("bind._langUpdated: "+this.is+" "+this.id+" "+e.type+" "+this.lang+" params.lang = "+(this.params?this.params.lang:""));console.log("bind._langUpdated: deepcopying model for lang "+this.lang);this.model=deepcopy(this.text.model);this.notifyPath("model",this.model);this.render()}}.bind(bind);bind._onDomChangeAfterLangUpdated=function(e){console.log("bind._onDomChangeAfterLangUpdated "+this.is+" "+this.id+" "+e.type+" "+this.lang+" params.lang = "+(this.params?this.params.lang:""));if(this.params&&this.params.lang===this.lang){console.log("bind._onDomChangeAfterLangUpdated "+this.is+" "+this.id+" "+e.type+" firing local-dom-ready");this.fire("local-dom-ready")}e.stopPropagation();return!1}.bind(bind);bind.addEventListener("lang-updated",bind._langUpdated);bind.addEventListener("dom-change",bind._onDomChangeAfterLangUpdated);window.removeEventListener("dom-change",onDomChangeForBind);bind.done=!0}})},10);suite("I18nElement with "+(0<=window.location.href.indexOf("?dom=Shadow")?"Shadow DOM":"Shady DOM")+(" in "+syntax+" syntax"),function(){var lang0="",lang1="en",lang2="fr",lang3="ja",lang4="fr-CA",lang5="zh-Hans-CN",lang6="ru",text_simple={model:{},text:" outermost text at the beginning ",h1_3:"outermost header 1",text_4:" outermost text in the middle ",span_5:"simple text without id",span_6:"simple text without id 2","label-1":"simple text with id","label-2":"simple text with id 2","div_9:span":"simple text within div","div_9:span_1":"simple text within div 2","div_9:div_2:div":"great grandchild text within div","div_10:text":" simple text as the first element in div ","div_10:span_1":"simple text within div","div_10:text_2":" simple text in the middle of div ","div_10:span_3":"simple text within div 2","div_10:div_4:div":"great grandchild text within div","div_10:text_5":" simple text at the last element in div ","toplevel-div:span":"simple text within div","toplevel-div:span_1":"simple text within div 2","third-level-div":"great grandchild text within div","second-level-div:div_1":"great grandchild text within div without id","div_12:ul:li":"line item without id 1","div_12:ul:li_1":"line item without id 2","div_12:ul:li_2":"line item without id 3","line-items:li":"line item with id 1","line-items:li_1":"line item with id 2","line-items:li_2":"line item with id 3",p_13:["A paragraph with {1} is converted to {2}.","parameters","<i18n-format>"],paragraph:["A paragraph with {1} is converted to {2}.","id","<i18n-format>"],text_15:" outermost text at the end "},localDOM_simple=[{select:"div:not([id])","previousTextSibling.data":" outermost text at the beginning "},{select:"h1",textContent:"outermost header 1"},{select:"h1","nextTextSibling.data":" outermost text in the middle "},{select:"span:not([id])",textContent:["simple text without id","simple text without id 2"]},{select:"span[id=\"label-1\"]",textContent:"simple text with id"},{select:"span[id=\"label-2\"]",textContent:"simple text with id 2"},{select:"span[id=\"label-2\"] + div span:not([id])",textContent:["simple text within div","simple text within div 2"]},{select:"span[id=\"label-2\"] + div div:not([id]) div:not([id])",textContent:["great grandchild text within div"]},{select:"span[id=\"label-2\"] + div + div","childNodes.0.data":" simple text as the first element in div "},{select:"span[id=\"label-2\"] + div + div span:not([id])",textContent:["simple text within div","simple text within div 2"]},{select:"span[id=\"label-2\"] + div + div span:not([id])","nextTextSibling.data":" simple text in the middle of div "},{select:"span[id=\"label-2\"] + div + div div:not([id]) div:not([id])",textContent:"great grandchild text within div"},{select:"span[id=\"label-2\"] + div + div div:not([id])","nextTextSibling.data":" simple text at the last element in div "},{select:"[id=\"toplevel-div\"] span:not([id])",textContent:["simple text within div","simple text within div 2"]},{select:"[id=\"third-level-div\"]",textContent:"great grandchild text within div"},{select:"[id=\"second-level-div\"] div:not([id])",textContent:"great grandchild text within div without id"},{select:"div ul:not([id]) li:not([id])",textContent:["line item without id 1","line item without id 2","line item without id 3"]},{select:"[id=\"line-items\"] li:not([id])",textContent:["line item with id 1","line item with id 2","line item with id 3"]},{select:"p:not([id]) i18n-format","PolymerDom.children.0.textContent":"A paragraph with {1} is converted to {2}."},{select:"p:not([id]) i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"parameters","PolymerDom.children.1.attributes.slot.value":"1"},{select:"p:not([id]) i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"<i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.0.textContent":"A paragraph with {1} is converted to {2}."},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"id","PolymerDom.children.1.attributes.slot.value":"1"},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"<i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[id=\"paragraph\"]","nextTextSibling.data":" outermost text at the end "}],text_simple_text_id={model:{},text:" outermost text at the beginning ",h1_3:"outermost header 1",text_4:" outermost text in the middle ",span_5:"simple text without id",span_6:"simple text without id 2","label-1":"simple text with id","label-2":"simple text with id 2","div_9:span":"simple text within div","div_9:span_1":"simple text within div 2","div_9:div_2:div":"great grandchild text within div","div_10:text":" simple text as the first element in div ","div_10:span_1":"simple text within div","div_10:text_2":" simple text in the middle of div ","div_10:span_3":"simple text within div 2","div_10:div_4:div":"great grandchild text within div","div_10:text_5":" simple text at the last element in div ","toplevel-div:span":"simple text within div","toplevel-div:span_1":"simple text within div 2","second-level-div":[" {1}\n        {2} ","great grandchild text within div","great grandchild text within div without id"],"div_12:ul:li":"line item without id 1","div_12:ul:li_1":"line item without id 2","div_12:ul:li_2":"line item without id 3","line-items":[" {1}\n        {2}\n        {3} ","line item with id 1","line item with id 2","line item with id 3"],p_13:["A paragraph with {1} is converted to {2}.","parameters","<i18n-format>"],paragraph:["A paragraph with {1} is converted to {2}.","id","<i18n-format>"],text_15:" outermost text at the end "},localDOM_simple_text_id=[{select:"div:not([text-id])","previousTextSibling.data":" outermost text at the beginning "},{select:"h1",textContent:"outermost header 1"},{select:"h1","nextTextSibling.data":" outermost text in the middle "},{select:"span:not([text-id])",textContent:["simple text without id","simple text without id 2"]},{select:"span[text-id=\"label-1\"]",textContent:"simple text with id"},{select:"span[text-id=\"label-2\"]",textContent:"simple text with id 2"},{select:"span[text-id=\"label-2\"] + div span:not([text-id])",textContent:["simple text within div","simple text within div 2"]},{select:"span[text-id=\"label-2\"] + div div:not([text-id]) div:not([text-id])",textContent:["great grandchild text within div"]},{select:"span[text-id=\"label-2\"] + div + div","childNodes.0.data":" simple text as the first element in div "},{select:"span[text-id=\"label-2\"] + div + div span:not([text-id])",textContent:["simple text within div","simple text within div 2"]},{select:"span[text-id=\"label-2\"] + div + div span:not([text-id])","nextTextSibling.data":" simple text in the middle of div "},{select:"span[text-id=\"label-2\"] + div + div div:not([text-id]) div:not([text-id])",textContent:"great grandchild text within div"},{select:"span[text-id=\"label-2\"] + div + div div:not([text-id])","nextTextSibling.data":" simple text at the last element in div "},{select:"[text-id=\"toplevel-div\"] span:not([text-id])",textContent:["simple text within div","simple text within div 2"]},{select:"[text-id=\"second-level-div\"] i18n-format","PolymerDom.children.0.textContent":" {1}\n        {2} "},{select:"[text-id=\"second-level-div\"] i18n-format","PolymerDom.children.1.tagName":"DIV","PolymerDom.children.1.textContent":"great grandchild text within div","PolymerDom.children.1.attributes.slot.value":"1"},{select:"[text-id=\"second-level-div\"] i18n-format","PolymerDom.children.2.tagName":"DIV","PolymerDom.children.2.textContent":"great grandchild text within div without id","PolymerDom.children.2.attributes.slot.value":"2"},{select:"div ul:not([text-id]) li:not([text-id])",textContent:["line item without id 1","line item without id 2","line item without id 3"]},{select:"[text-id=\"line-items\"] i18n-format","PolymerDom.children.0.textContent":" {1}\n        {2}\n        {3} "},{select:"[text-id=\"line-items\"] i18n-format","PolymerDom.children.1.tagName":"LI","PolymerDom.children.1.textContent":"line item with id 1","PolymerDom.children.1.attributes.slot.value":"1"},{select:"[text-id=\"line-items\"] i18n-format","PolymerDom.children.2.tagName":"LI","PolymerDom.children.2.textContent":"line item with id 2","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[text-id=\"line-items\"] i18n-format","PolymerDom.children.3.tagName":"LI","PolymerDom.children.3.textContent":"line item with id 3","PolymerDom.children.3.attributes.slot.value":"3"},{select:"p:not([text-id]) i18n-format","PolymerDom.children.0.textContent":"A paragraph with {1} is converted to {2}."},{select:"p:not([text-id]) i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"parameters","PolymerDom.children.1.attributes.slot.value":"1"},{select:"p:not([text-id]) i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"<i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[text-id=\"paragraph\"] i18n-format","PolymerDom.children.0.textContent":"A paragraph with {1} is converted to {2}."},{select:"[text-id=\"paragraph\"] i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"id","PolymerDom.children.1.attributes.slot.value":"1"},{select:"[text-id=\"paragraph\"] i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"<i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[text-id=\"paragraph\"]","nextTextSibling.data":" outermost text at the end "}],sender1={name:"Joe",gender:"male"},recipients1=[{name:"Alice",gender:"female"},{name:"Bob",gender:"male"},{name:"Yoda",gender:"other"}],recipients2=[{name:"Alice",gender:"female"},{name:"Bob",gender:"male"}],recipients3=[{name:"Bob",gender:"male"}],recipients4=[],text_plural_gender={model:{},"compound-format-text":[{0:"You ({3}) gave no gifts.",1:{male:"You ({3}) gave him ({4}) {5}.",female:"You ({3}) gave her ({4}) {5}.",other:"You ({3}) gave them ({4}) {5}."},one:{male:"You ({3}) gave him ({4}) and one other person {5}.",female:"You ({3}) gave her ({4}) and one other person {5}.",other:"You ({3}) gave them ({4}) and one other person {5}."},other:"You ({3}) gave them ({4}) and {1} other people gifts."},"{{recipients.length - 1}}","{{recipients.0.gender}}","{{sender.name}}","{{recipients.0.name}}","a gift"]},localDOM_plural_gender_1=[{select:"#compound-format-text","root.PolymerDom.textContent":"You () gave them () and  other people gifts."},{select:"#compound-format-text","PolymerDom.children.1.PolymerDom.childNodes.0.data.raw":"3"},{select:"#compound-format-text","PolymerDom.children.2.PolymerDom.childNodes.0.data.raw":"female"},{select:"#compound-format-text","PolymerDom.children.3.PolymerDom.childNodes.0.data.raw":"Joe"},{select:"#compound-format-text","PolymerDom.children.4.PolymerDom.childNodes.0.data.raw":"Alice"},{select:"#compound-format-text","PolymerDom.children.5.PolymerDom.childNodes.0.data":"a gift"}],localDOM_plural_gender_2=[{select:"#compound-format-text","root.PolymerDom.textContent":"You () gave her () and one other person ."},{select:"#compound-format-text","PolymerDom.children.1.PolymerDom.childNodes.0.data.raw":"2"},{select:"#compound-format-text","PolymerDom.children.2.PolymerDom.childNodes.0.data.raw":"female"},{select:"#compound-format-text","PolymerDom.children.3.PolymerDom.childNodes.0.data.raw":"Joe"},{select:"#compound-format-text","PolymerDom.children.4.PolymerDom.childNodes.0.data.raw":"Alice"},{select:"#compound-format-text","PolymerDom.children.5.PolymerDom.childNodes.0.data":"a gift"}],localDOM_plural_gender_3=[{select:"#compound-format-text","root.PolymerDom.textContent":"You () gave him () ."},{select:"#compound-format-text","PolymerDom.children.1.PolymerDom.childNodes.0.data.raw":"1"},{select:"#compound-format-text","PolymerDom.children.2.PolymerDom.childNodes.0.data.raw":"male"},{select:"#compound-format-text","PolymerDom.children.3.PolymerDom.childNodes.0.data.raw":"Joe"},{select:"#compound-format-text","PolymerDom.children.4.PolymerDom.childNodes.0.data.raw":"Bob"},{select:"#compound-format-text","PolymerDom.children.5.PolymerDom.childNodes.0.data":"a gift"}],localDOM_plural_gender_4=[{select:"#compound-format-text","root.PolymerDom.textContent":"You () gave no gifts."},{select:"#compound-format-text","PolymerDom.children.1.PolymerDom.childNodes.0.data.raw":"0"},{select:"#compound-format-text","PolymerDom.children.2.PolymerDom.childNodes.0.data.raw":""},{select:"#compound-format-text","PolymerDom.children.3.PolymerDom.childNodes.0.data.raw":"Joe"},{select:"#compound-format-text","PolymerDom.children.4.PolymerDom.childNodes.0.data.raw":""},{select:"#compound-format-text","PolymerDom.children.5.PolymerDom.childNodes.0.data":"a gift"}],text_simple_attribute={model:{"standard-input":{placeholder:"standard HTML5 attribute"},"outer-div:input_2":{placeholder:"standard HTML5 attribute without id"},"paper-input-element":{label:"paper-input label","error-message":"paper-input error message",placeholder:"paper-input placeholder"},"outer-div:paper-input_4":{label:"paper-input label without id","error-message":"paper-input error message without id",placeholder:"paper-input placeholder without id"},"pie-chart":{options:{title:"Distribution of days in 2001H1"},cols:[{label:"Month",type:"string"},{label:"Days",type:"number"}],rows:[["Jan",31],["Feb",28],["Mar",31],["Apr",30],["May",31],["Jun",30]]},"column-chart":{options:{title:"Inventory"},data:[["Year","Things","Stuff"],["2004",1e3,400],["2005",1170,460],["2006",660,1120],["2007",1030,540]]},"custom-attr":{"custom-text-attr1":"custom text attribute 1","custom-text-attr2":"custom text attribute 2","custom-text-attr3":"custom text attribute 3"},"selective-attr":{"custom-text-attr4":["{1} custom-text-attr4 attribute with param {2} and param {3} {4}","{{text.ordinary-div}}","{{text.ordinary-div}}","[[text.ordinary-div]]","{{text.ordinary-div}}"],"custom-text-attr5":["[[text.ordinary-div]]"," custom-text-attr5 attribute with param ","{{or('',text.ordinary-div)}}"," and param ","[[text.ordinary-div]]"],"i18n-target":["i18n-target attribute with param {1} and param {2}","{{text.ordinary-div}}","[[text.ordinary-div]]"],"i18n-target2":["i18n-target2 attribute with param ","{{or('',text.ordinary-div)}}"," and param ","[[text.ordinary-div]]"]},"selective-attr2":{"i18n-target":"i18n-target attribute 2"},"selective-attr3":{"i18n-target6":"i18n-target6 attribute 2"},"selective-attr4":{"i18n-target6":"i18n-target6 attribute 3"},"json-data-id":{attr1:"this attr1 is extracted","i18n-target-attr":"this attribute is also extracted"},"template_2:json-data_1":{attr1:"this attr1 without id is extracted","i18n-target-attr":"this attribute without id is also extracted"}},"ordinary-div":"text 1"},model_simple_attribute={"standard-input":{placeholder:"standard HTML5 attribute"},"outer-div:input_2":{placeholder:"standard HTML5 attribute without id"},"paper-input-element":{label:"paper-input label","error-message":"paper-input error message",placeholder:"paper-input placeholder"},"outer-div:paper-input_4":{label:"paper-input label without id","error-message":"paper-input error message without id",placeholder:"paper-input placeholder without id"},"pie-chart":{options:{title:"Distribution of days in 2001H1"},cols:[{label:"Month",type:"string"},{label:"Days",type:"number"}],rows:[["Jan",31],["Feb",28],["Mar",31],["Apr",30],["May",31],["Jun",30]]},"column-chart":{options:{title:"Inventory"},data:[["Year","Things","Stuff"],["2004",1e3,400],["2005",1170,460],["2006",660,1120],["2007",1030,540]]},"custom-attr":{"custom-text-attr1":"custom text attribute 1","custom-text-attr2":"custom text attribute 2","custom-text-attr3":"custom text attribute 3"},"selective-attr":{"custom-text-attr4":["{1} custom-text-attr4 attribute with param {2} and param {3} {4}","{{text.ordinary-div}}","{{text.ordinary-div}}","[[text.ordinary-div]]","{{text.ordinary-div}}"],"custom-text-attr5":["[[text.ordinary-div]]"," custom-text-attr5 attribute with param ","{{or('',text.ordinary-div)}}"," and param ","[[text.ordinary-div]]"],"i18n-target":["i18n-target attribute with param {1} and param {2}","{{text.ordinary-div}}","[[text.ordinary-div]]"],"i18n-target2":["i18n-target2 attribute with param ","{{or('',text.ordinary-div)}}"," and param ","[[text.ordinary-div]]"]},"selective-attr2":{"i18n-target":"i18n-target attribute 2"},"selective-attr3":{"i18n-target6":"i18n-target6 attribute 2"},"selective-attr4":{"i18n-target6":"i18n-target6 attribute 3"},"json-data-id":{attr1:"this attr1 is extracted","i18n-target-attr":"this attribute is also extracted"},"template_2:json-data_1":{attr1:"this attr1 without id is extracted","i18n-target-attr":"this attribute without id is also extracted"}},localDOM_simple_attribute=[{select:"input[id=\"standard-input\"]","placeholder.text":"standard HTML5 attribute"},{select:"input[id=\"standard-input\"] + input","placeholder.text":"standard HTML5 attribute without id"},{select:"paper-input[id=\"paper-input-element\"]","label.text":"paper-input label","errorMessage.text":"paper-input error message","placeholder.text":"paper-input placeholder"},{select:"paper-input[id=\"paper-input-element\"] + paper-input","label.text":"paper-input label without id","errorMessage.text":"paper-input error message without id","placeholder.text":"paper-input placeholder without id"},{select:"google-chart[id=\"pie-chart\"]","options.title.text":"Distribution of days in 2001H1","cols.0.label.text":"Month","cols.1.label.text":"Days","rows.0.0.text":"Jan","rows.1.0.text":"Feb","rows.2.0.text":"Mar","rows.3.0.text":"Apr","rows.4.0.text":"May","rows.5.0.text":"Jun"},{select:"google-chart[id=\"column-chart\"]","options.title.text":"Inventory","data.0.0.text":"Year","data.0.1.text":"Things","data.0.2.text":"Stuff"},{select:"text-attribute-element[id=\"custom-attr\"]","customTextAttr1.text":"custom text attribute 1","customTextAttr2.text":"custom text attribute 2","customTextAttr3.text":"custom text attribute 3"},{select:"text-attribute-element[id=\"selective-attr\"]","i18nTarget.raw":"i18n-target attribute with param text 1 and param text 1","i18nTarget2.raw":"i18n-target2 attribute with param text 1 and param text 1"},{select:"span[id=\"test-json-data-1\"]",textContent:"this attr1 is extracted"},{select:"span[id=\"test-json-data-2\"]",textContent:"this attribute is also extracted"},{select:"span[id=\"test-json-data-3\"]",textContent:"this attr1 without id is extracted"},{select:"span[id=\"test-json-data-4\"]",textContent:"this attribute without id is also extracted"}],localDOM_simple_attribute_fr=[{select:"input[id=\"standard-input\"]","placeholder.text":"standard HTML5 attribute"},{select:"input[id=\"standard-input\"] + input","placeholder.text":"standard HTML5 attribute without id"},{select:"paper-input[id=\"paper-input-element\"]","label.text":"paper-input label","errorMessage.text":"paper-input error message","placeholder.text":"paper-input placeholder"},{select:"paper-input[id=\"paper-input-element\"] + paper-input","label.text":"paper-input label without id","errorMessage.text":"paper-input error message without id","placeholder.text":"paper-input placeholder without id"},{select:"google-chart[id=\"pie-chart\"]","options.title.text":"Distribution of days in 2001H1","cols.0.label.text":"Month","cols.1.label.text":"Days","rows.0.0.text":"Jan","rows.1.0.text":"Feb","rows.2.0.text":"Mar","rows.3.0.text":"Apr","rows.4.0.text":"May","rows.5.0.text":"Jun"},{select:"google-chart[id=\"column-chart\"]","options.title.text":"Inventory","data.0.0.text":"Year","data.0.1.text":"Things","data.0.2.text":"Stuff"},{select:"text-attribute-element[id=\"custom-attr\"]","customTextAttr1.text":"custom text attribute 1","customTextAttr2.text":"custom text attribute 2","customTextAttr3.text":"custom text attribute 3"},{select:"text-attribute-element[id=\"selective-attr\"]","i18nTarget.raw":"fr i18n-target attribute with param fr text 1 and param fr text 1","i18nTarget2.raw":"fr i18n-target2 attribute with param fr text 1 fr and param fr text 1"},{select:"span[id=\"test-json-data-1\"]",textContent:"this attr1 is extracted"},{select:"span[id=\"test-json-data-2\"]",textContent:"this attribute is also extracted"},{select:"span[id=\"test-json-data-3\"]",textContent:"this attr1 without id is extracted"},{select:"span[id=\"test-json-data-4\"]",textContent:"this attribute without id is also extracted"}],text_fallback={model:{},text:"fr-CA  outermost text at the beginning ",h1_3:"fr-CA outermost header 1",text_4:"fr-CA  outermost text in the middle ",span_5:"fr-CA simple text without id",span_6:"fr-CA simple text without id 2","label-1":"fr-CA simple text with id","label-2":"fr-CA simple text with id 2","div_9:span":"simple text within div","div_9:span_1":"simple text within div 2","div_9:div_2:div":"great grandchild text within div","div_10:text":" simple text as the first element in div ","div_10:span_1":"fr-CA simple text within div","div_10:text_2":" simple text in the middle of div ","div_10:span_3":"simple text within div 2","div_10:div_4:div":"great grandchild text within div","div_10:text_5":" simple text at the last element in div ","toplevel-div:span":"fr-CA simple text within div","toplevel-div:span_1":"fr-CA simple text within div 2","third-level-div":"fr-CA great grandchild text within div","second-level-div:div_1":"fr-CA great grandchild text within div without id","div_12:ul:li":"fr line item without id 1","div_12:ul:li_1":"fr line item without id 2","div_12:ul:li_2":"fr line item without id 3","line-items:li":"fr line item with id 1","line-items:li_1":"fr line item with id 2","line-items:li_2":"fr line item with id 3",p_13:["fr-CA A paragraph with {1} is converted to {2}.","fr-CA parameters","fr-CA <i18n-format>"],paragraph:["fr-CA A paragraph with {1} is converted to {2}.","fr-CA id","fr-CA <i18n-format>"],text_15:"fr-CA  outermost text at the end "},localDOM_fallback=[{select:"div:not([id])","previousTextSibling.data":"fr-CA  outermost text at the beginning "},{select:"h1",textContent:"fr-CA outermost header 1"},{select:"h1","nextTextSibling.data":"fr-CA  outermost text in the middle "},{select:"span:not([id])",textContent:["fr-CA simple text without id","fr-CA simple text without id 2"]},{select:"span[id=\"label-1\"]",textContent:"fr-CA simple text with id"},{select:"span[id=\"label-2\"]",textContent:"fr-CA simple text with id 2"},{select:"span[id=\"label-2\"] + div span:not([id])",textContent:["simple text within div","simple text within div 2"]},{select:"span[id=\"label-2\"] + div div:not([id]) div:not([id])",textContent:["great grandchild text within div"]},{select:"span[id=\"label-2\"] + div + div","childNodes.0.data":" simple text as the first element in div "},{select:"span[id=\"label-2\"] + div + div span:not([id])",textContent:["fr-CA simple text within div","simple text within div 2"]},{select:"span[id=\"label-2\"] + div + div span:not([id])","nextTextSibling.data":" simple text in the middle of div "},{select:"span[id=\"label-2\"] + div + div div:not([id]) div:not([id])",textContent:"great grandchild text within div"},{select:"span[id=\"label-2\"] + div + div div:not([id])","nextTextSibling.data":" simple text at the last element in div "},{select:"[id=\"toplevel-div\"] span:not([id])",textContent:["fr-CA simple text within div","fr-CA simple text within div 2"]},{select:"[id=\"third-level-div\"]",textContent:"fr-CA great grandchild text within div"},{select:"[id=\"second-level-div\"] div:not([id])",textContent:"fr-CA great grandchild text within div without id"},{select:"div ul:not([id]) li:not([id])",textContent:["fr line item without id 1","fr line item without id 2","fr line item without id 3"]},{select:"[id=\"line-items\"] li:not([id])",textContent:["fr line item with id 1","fr line item with id 2","fr line item with id 3"]},{select:"p:not([id]) i18n-format","PolymerDom.children.0.textContent":"fr-CA A paragraph with {1} is converted to {2}."},{select:"p:not([id]) i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"fr-CA parameters","PolymerDom.children.1.attributes.slot.value":"1"},{select:"p:not([id]) i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"fr-CA <i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.0.textContent":"fr-CA A paragraph with {1} is converted to {2}."},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"fr-CA id","PolymerDom.children.1.attributes.slot.value":"1"},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.2.tagName":"CODE","PolymerDom.children.2.textContent":"fr-CA <i18n-format>","PolymerDom.children.2.attributes.slot.value":"2"},{select:"[id=\"paragraph\"]","nextTextSibling.data":"fr-CA  outermost text at the end "}],param1="1st compound parameter",param2="2nd compound parameter",text_compound={model:{},text:[" outermost text at the beginning with compound {1} and {2} variables ","{{param1}}","{{param2}}"],h1_3:["outermost header 1 with {1} and {2} variables","{{param1}}","{{param2}}"],text_4:[" outermost text in the middle with {1} and {2} variables ","{{param1}}","{{param2}}"],span_5:["simple text without id with {1} and {2} variables","{{param1}}","{{param2}}"],span_6:["simple text without id 2 with {1} and {2} variables","{{param1}}","{{param2}}"],"label-1":["simple text with id and {1} and {2} variables","{{param1}}","{{param2}}"],"label-2":["simple text with id and {1} and {2} variables 2","{{param1}}","{{param2}}"],"div_9:span":["simple text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"div_9:span_1":["simple text within div with {1} and {2} variables 2","{{param1}}","{{param2}}"],"div_9:div_2:div":["great grandchild text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"div_10:text":[" simple text as the first element in div with {1} and {2} variables ","{{param1}}","{{param2}}"],"div_10:span_1":["simple text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"div_10:text_2":[" simple text in the middle of div with {1} and {2} variables ","{{param1}}","{{param2}}"],"div_10:span_3":["simple text within div with {1} and {2} variables 2","{{param1}}","{{param2}}"],"div_10:div_4:div":["great grandchild text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"div_10:text_5":[" simple text at the last element in div with {1} and {2} variables ","{{param1}}","{{param2}}"],"toplevel-div:span":["simple text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"toplevel-div:span_1":["simple text within div 2 with {1} and {2} variables","{{param1}}","{{param2}}"],"third-level-div":["great grandchild text within div with {1} and {2} variables","{{param1}}","{{param2}}"],"second-level-div:div_1":["great grandchild text within div without id with {1} and {2} variables","{{param1}}","{{param2}}"],"div_12:ul:li":["line item without id 1 with {1} and {2} variables","{{param1}}","{{param2}}"],"div_12:ul:li_1":["line item without id 2 with {1} and {2} variables","{{param1}}","{{param2}}"],"div_12:ul:li_2":["line item without id 3 with {1} and {2} variables","{{param1}}","{{param2}}"],"line-items:li":["line item with id 1 with {1} and {2} variables","{{param1}}","{{param2}}"],"line-items:li_1":["line item with id 2 with {1} and {2} variables","{{param1}}","{{param2}}"],"line-items:li_2":["line item with id 3 with {1} and {2} variables","{{param1}}","{{param2}}"],p_13:["A paragraph with {1} is converted to {2}.","{{param1}}","{{param2}}"],paragraph:["A paragraph with {1}, {2}, and {3} is converted to {4}.","id","{{param1}}","{{param2}}","<i18n-format>"],text_15:[" outermost text at the end with {1} and {2} variables ","{{param1}}","{{param2}}"]},localDOM_compound=[{select:"i18n-format","PolymerDom.children.0.textContent":[" outermost text at the beginning with compound {1} and {2} variables ","outermost header 1 with {1} and {2} variables"," outermost text in the middle with {1} and {2} variables ","simple text without id with {1} and {2} variables","simple text without id 2 with {1} and {2} variables","simple text with id and {1} and {2} variables","simple text with id and {1} and {2} variables 2","simple text within div with {1} and {2} variables","simple text within div with {1} and {2} variables 2","great grandchild text within div with {1} and {2} variables"," simple text as the first element in div with {1} and {2} variables ","simple text within div with {1} and {2} variables"," simple text in the middle of div with {1} and {2} variables ","simple text within div with {1} and {2} variables 2","great grandchild text within div with {1} and {2} variables"," simple text at the last element in div with {1} and {2} variables ","simple text within div with {1} and {2} variables","simple text within div 2 with {1} and {2} variables","great grandchild text within div with {1} and {2} variables","great grandchild text within div without id with {1} and {2} variables","line item without id 1 with {1} and {2} variables","line item without id 2 with {1} and {2} variables","line item without id 3 with {1} and {2} variables","line item with id 1 with {1} and {2} variables","line item with id 2 with {1} and {2} variables","line item with id 3 with {1} and {2} variables","A paragraph with {1} is converted to {2}.","A paragraph with {1}, {2}, and {3} is converted to {4}."," outermost text at the end with {1} and {2} variables "],"PolymerDom.children.1.textContent.raw":["1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter","1st compound parameter"],"PolymerDom.children.2.textContent.raw":["2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","2nd compound parameter","1st compound parameter","2nd compound parameter"]},{select:"[id=\"paragraph\"] i18n-format","PolymerDom.children.1.tagName":"B","PolymerDom.children.1.textContent":"id","PolymerDom.children.1.attributes.slot.value.raw":"1","PolymerDom.children.3.tagName":"SPAN","PolymerDom.children.3.textContent.raw":"2nd compound parameter","PolymerDom.children.3.attributes.slot.value.raw":"3"},{select:"[id=\"paragraph\"] +i18n-format","PolymerDom.children.1.textContent.raw":"1st compound parameter"}],suites=[s("simple text default",null,{fixture:"simple-text-element-default-fixture",fixtureModel:void 0,assign:void 0,lang:lang1,effectiveLang:lang1,templateDefaultLang:lang1,observeHtmlLang:!0,text:text_simple,model:{},localDOM:localDOM_simple,lightDOM:void 0}),s("commented simple text default","simple text default",{fixture:"commented-simple-text-element-default-fixture"}),s("simple text default null lang","simple text default",{assign:{lang:lang0},lang:lang0,effectiveLang:lang0}),s("commented simple text default null lang","commented simple text default",{assign:{lang:lang0},lang:lang0,effectiveLang:lang0}),s(lang2+" simple text default","simple text default",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s(lang2+" commented simple text default","commented simple text default",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s("simple text null lang","simple text default",{fixture:"simple-text-element-fixture",fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang0},lang:lang0,effectiveLang:lang0,observeHtmlLang:!1}),s("simple text","simple text null lang",{assign:{lang:lang1},lang:lang1,effectiveLang:lang1}),s(lang2+" simple text","simple text",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s(lang6+" simple text","simple text",{assign:{lang:lang6},lang:lang6,effectiveLang:lang6}),s("commented simple text","simple text",{fixture:"commented-simple-text-element-fixture"}),s("commented simple text null lang","commented simple text",{assign:{lang:lang0},lang:lang0,effectiveLang:lang0}),s(lang2+" commented simple text","commented simple text",{fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s(lang2+" static commented simple text","commented simple text",{fixtureModel:{observeHtmlLang:!1,lang:lang2},assign:void 0,lang:lang2,effectiveLang:lang2}),s("simple text id","simple text",{fixture:"simple-text-id-element-fixture",text:text_simple_text_id,localDOM:localDOM_simple_text_id}),s(lang2+" simple text id","simple text id",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s("plural gender","simple text default",{fixture:"plural-gender-element-fixture",fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang1,sender:sender1,recipients:recipients1},observeHtmlLang:!1,event:"local-dom-ready",text:text_plural_gender,localDOM:localDOM_plural_gender_1}),s("plural gender 2","plural gender",{assign:{lang:lang1,sender:sender1,recipients:recipients2},localDOM:localDOM_plural_gender_2}),s("plural gender 3","plural gender",{assign:{lang:lang1,sender:sender1,recipients:recipients3},localDOM:localDOM_plural_gender_3}),s("plural gender 4","plural gender",{assign:{lang:lang1,sender:sender1,recipients:recipients4},localDOM:localDOM_plural_gender_4}),s(lang2+" plural gender","plural gender",{assign:{lang:lang2,sender:sender1,recipients:recipients1},lang:lang2,effectiveLang:lang2}),s(lang2+" plural gender 2","plural gender 2",{assign:{lang:lang2,sender:sender1,recipients:recipients2},lang:lang2,effectiveLang:lang2,localDOM:localDOM_plural_gender_2}),s(lang2+" plural gender 3","plural gender 3",{assign:{lang:lang2,sender:sender1,recipients:recipients3},lang:lang2,effectiveLang:lang2,localDOM:localDOM_plural_gender_3}),s(lang2+" plural gender 4","plural gender 4",{assign:{lang:lang2,sender:sender1,recipients:recipients4},lang:lang2,effectiveLang:lang2,localDOM:localDOM_plural_gender_4}),s("simple attribute","simple text default",{fixture:"simple-attribute-element-fixture",fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang1},observeHtmlLang:!1,text:text_simple_attribute,model:model_simple_attribute,localDOM:localDOM_simple_attribute}),s(lang2+" simple attribute","simple attribute",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2,localDOM:localDOM_simple_attribute_fr}),s(lang4+" simple text default with fallback to "+lang2,"simple text default",{timeout:6e4,assign:{lang:lang4},lang:lang2,effectiveLang:lang2}),s(lang4+" simple text with fallback to "+lang2,"simple text",{timeout:6e4,assign:{lang:lang4},lang:lang2,effectiveLang:lang2}),s(lang5+" simple text with fallback to default","simple text",{timeout:6e4,assign:{lang:lang5},lang:lang0,effectiveLang:lang0}),s(lang3+" simple text with fallback to default","simple text",{timeout:6e4,assign:{lang:lang3},lang:lang0,effectiveLang:lang0}),s(lang4+" fallback text","simple text",{timeout:6e4,fixture:"fallback-text-element-fixture",assign:{lang:lang4},lang:lang4,effectiveLang:lang4,rawText:!0,text:text_fallback,localDOM:localDOM_fallback}),s("compound binding","simple text",{fixture:"compound-binding-element-fixture",fixtureModel:{observeHtmlLang:!1,lang:lang0,param1:param1,param2:param2},text:text_compound,localDOM:localDOM_compound}),s(lang2+" compound binding","compound binding",{fixtureModel:{observeHtmlLang:!1,lang:lang0,param1:param1,param2:param2},assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s("simple attribute dom bind","simple attribute",{fixture:"simple-attribute-dom-bind",fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang1},event:"local-dom-ready",text:text_simple_attribute,model:model_simple_attribute,localDOM:localDOM_simple_attribute}),s(lang2+" simple attribute dom bind","simple attribute dom bind",{fixtureModel:{observeHtmlLang:!1,lang:lang0},assign:{lang:lang2},lang:lang2,effectiveLang:lang2,localDOM:localDOM_simple_attribute_fr}),s("compound binding dom bind","compound binding",{fixture:"compound-binding-dom-bind"}),s(lang2+" compound binding dom bind","compound binding dom bind",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s(lang2+" default observeHtmlLang simple text dom bind","simple text",{fixture:"simple-text-dom-bind",fixtureModel:{"html.lang":lang5},assign:{"html.lang":lang2},lang:lang2,effectiveLang:lang2,text:text_simple,model:void 0,localDOM:localDOM_simple,observeHtmlLang:!0}),s("simple text dom bind","simple text",{fixture:"simple-text-dom-bind",fixtureModel:{observeHtmlLang:!1,lang:lang0},text:text_simple,localDOM:localDOM_simple}),s(lang2+" simple text dom bind","simple text dom bind",{assign:{lang:lang2},lang:lang2,effectiveLang:lang2}),s("html.lang simple text dom bind","simple text dom bind",{fixtureModel:{observeHtmlLang:!0,lang:lang0,"html.lang":lang0},assign:{"html.lang":lang1},observeHtmlLang:!0}),s(lang2+" html.lang simple text dom bind","html.lang simple text dom bind",{assign:{"html.lang":lang2},lang:lang2,effectiveLang:lang2}),s("observeHtmlLang default simple text","simple text null lang",{fixtureModel:{observeHtmlLang:!0},assign:{"html.lang":lang1},lang:lang1,effectiveLang:lang1,observeHtmlLang:!0})];window.dispatchEvent(new CustomEvent("suites-loaded"));suitesRunner(suites,100)});export{defineElementBase as $defineElementBase,arraySelector as $arraySelector,customStyle as $customStyle,domBind as $domBind,domIf as $domIf,domModule as $domModule,domRepeat as $domRepeat,_class as $class,legacyElementMixin as $legacyElementMixin,mutableDataBehavior as $mutableDataBehavior,polymerFn as $polymerFn,polymer_dom as $polymerDom,templatizerBehavior as $templatizerBehavior,dirMixin as $dirMixin,elementMixin as $elementMixin,gestureEventListeners as $gestureEventListeners,mutableData as $mutableData,propertiesChanged as $propertiesChanged,propertiesMixin as $propertiesMixin,propertyAccessors as $propertyAccessors,propertyEffects as $propertyEffects,templateStamp as $templateStamp,arraySplice as $arraySplice,async as $async,caseMap$1 as $caseMap,debounce as $debounce,flattenedNodesObserver as $flattenedNodesObserver,flush$2 as $flush,gestures$1 as $gestures,htmlTag as $htmlTag,mixin as $mixin,path as $path,renderStatus as $renderStatus,resolveUrl$1 as $resolveUrl,settings as $settings,styleGather as $styleGather,templatize$1 as $templatize,polymerElement as $polymerElement,polymerLegacy as $polymerLegacy,applyShimUtils as $applyShimUtils,applyShim as $applyShim$1,commonRegex as $commonRegex,commonUtils as $commonUtils,cssParse as $cssParse,customStyleInterface as $customStyleInterface$1,documentWait$1 as $documentWait,styleSettings as $styleSettings,styleUtil as $styleUtil,templateMap$1 as $templateMap,unscopedStyleHandler as $unscopedStyleHandler,deepcopy$1 as $deepcopy,plurals$1 as $plurals,UncamelCase,functionName,getDefine,getId,defineDefineProperty,ArraySelectorMixin,ArraySelector,CustomStyle,DomBind,DomIf,DomModule,DomRepeat,mixinBehaviors,Class,LegacyElementMixin,MutableDataBehavior,OptionalMutableDataBehavior,Polymer,flush$1 as flush,enqueueDebouncer as addDebouncer,matchesSelector,DomApi,EventApi,dom,Templatizer,DirMixin,version,ElementMixin,instanceCount,registrations,register,dumpRegistrations,updateStyles,GestureEventListeners,MutableData,OptionalMutableData,PropertiesChanged,PropertiesMixin,PropertyAccessors,PropertyEffects,TemplateStamp,calculateSplices,timeOut,animationFrame,idlePeriod,microTask,dashToCamelCase,camelToDashCase,Debouncer,FlattenedNodesObserver,enqueueDebouncer,flush$1,gestures,recognizers,deepTargetFind,addListener,removeListener,register$1,setTouchAction,prevent,resetMouseCanceller,findOriginalTarget,add,remove,html,htmlLiteral,dedupingMixin,isPath,root,isAncestor,isDescendant,translate$1 as translate,matches,normalize,split,get,set,isDeep,flush as flush$2,beforeNextRender,afterNextRender,resolveUrl,resolveCss,pathFromUrl,useShadow,useNativeCSSProperties,useNativeCustomElements,rootPath,setRootPath,sanitizeDOMValue,setSanitizeDOMValue,passiveTouchGestures,setPassiveTouchGestures,strictTemplatePolicy,setStrictTemplatePolicy,allowTemplateFromDomModule,setAllowTemplateFromDomModule,stylesFromModules,stylesFromModule,stylesFromTemplate,stylesFromModuleImports,cssFromModules,cssFromModule,cssFromTemplate,cssFromModuleImports,templatize,modelForElement,TemplateInstanceBase,html as html$1,version as version$1,PolymerElement,Polymer as Polymer$1,html as html$2,Base,invalidate,invalidateTemplate,isValid,templateIsValid,isValidating,templateIsValidating,startValidating,startValidatingTemplate,elementsAreInvalid,ApplyShim as $applyShimDefault,VAR_ASSIGN,MIXIN_MATCH,VAR_CONSUMED,ANIMATION_MATCH,MEDIA_MATCH,IS_VAR,BRACKETED,HOST_PREFIX,HOST_SUFFIX,updateNativeProperties,getComputedStyleValue,detectMixin,StyleNode,parse,stringify,removeCustomPropAssignment,types,CustomStyleProvider,CustomStyleInterface as $customStyleInterfaceDefault,CustomStyleInterfaceInterface,documentWait as $documentWaitDefault,nativeShadow,cssBuild,nativeCssVariables,toCssText,rulesForStyle,isKeyframesSelector,forEachRule,applyCss,createScopeStyle,applyStylePlaceHolder,applyStyle,isTargetedBuild,findMatchingParen,processVariableAndFallback,setElementClassRaw,wrap,getIsExtends,gatherStyleText,splitSelectorList,getCssBuild,elementHasBuiltCss,getBuildComment,isOptimalCssBuild,templateMap as $templateMapDefault,scopingAttribute,processUnscopedStyle,isUnscopedStyle,deepcopy as $deepcopyDefault,plurals as $pluralsDefault};