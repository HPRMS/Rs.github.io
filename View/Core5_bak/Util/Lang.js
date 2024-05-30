sjs.using("jQuery")
.using("Core5.Util.Tool")
.define(function($,tool){
    return {
        langContents:{}

        //新的多語言方式，讓開發程式時就直接支援兩或三種語言，如果還有，就再用字典方式新加(掃描源碼，找</i>標籤)
        ,setLangMap:function(langNm,mapOrKey,value){
            if(!this.langContents[langNm]){
                this.langContents[langNm] = {};
            }
            if(typeof(mapOrKey)=="string"){
                this.langContents[langNm][mapOrKey] = value;
            }
            else{
                for(var key in mapOrKey){
                    this.langContents[langNm][key] = mapOrKey[key];
                }
            }
        }

        ,getLangMap:function(langNm,key){
            langNm = langNm || this.defaultLang;
            var ret = this.langContents[langNm] ? this.langContents[langNm][key] || null:null;
            if(!ret && langNm != this.defaultLang){
                langNm = this.defaultLang;
                ret = this.langContents[langNm] ? this.langContents[langNm][key] || null:null;
            }
            return ret;
        }    

        ,switchLang:function(lang){
            lang ? tool.setCookie("SJS_LANG",lang,3650,"/"):tool.clearCookie("SJS_LANG");

            var oThis = this;
            $("i").each(function(){
                oThis._switchLang($(this),lang);
            });
        }


        ,_switchLang:function(iTag,lang){
            var content = iTag.text();
                    
            //backup default language
            var defaultLangContent = iTag.attr("s-lang-default");
            !defaultLangContent && iTag.attr("s-lang-default",content);

            var langid = iTag.attr("s-lang-id") || defaultLangContent || content;
            var contentInPackage = this.getLangMap(lang,langid);
            if(contentInPackage){
                iTag.text(contentInPackage);
            }
            else{
                //這邊不判斷defaultLang，dom中的默認語言就是<i>標簽中的內容
                var contentInDom = iTag.attr(lang);// || iTag.attr(this.defaultLang);
                if(contentInDom){
                    iTag.text(contentInDom);
                }
                else{
                    defaultLangContent && iTag.text(defaultLangContent);
                }
            }
        }

        ,html:function(jq,html){
            jq.html(this.parseRenderHtml(html));
        }

        ,getPageLang:function(){
            return sjs.getLanguage() || tool.getCookie("SJS_LANG");
        }

        ,defaultLang:"en"
        
        ,parseRenderHtml:function(html){
            var lang = this.getPageLang();
            var oThis = this;
            if(lang && html){       //默認語言時不做任何處理
                html = $("<div></div>").html(html).find("i").each(function(){
                    oThis._switchLang($(this),lang);
                }).end().html();
            }
            return html;        
        }    
    }
});