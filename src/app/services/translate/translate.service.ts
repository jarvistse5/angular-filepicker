import { Injectable, Inject } from '@angular/core';

import { TRANSLATIONS } from './translation'; // import our opaque token

@Injectable()
export class TranslateService {

  private selectedLang: string = '';
  private supportedLanguages: any[] = [];
  private appDefaultLang: string;

  // inject our translations
	constructor(
    @Inject(TRANSLATIONS) private _translations: any,
  ) {
    this.supportedLanguages = [
      { text: 'English', value: 'en', default: true },
      { text: '繁體中文', value: 'zh_hk', default: false },
      { text: '简体中文', value: 'zh_cn', default: false },
    ],
    this.appDefaultLang = this.supportedLanguages.find(lang => lang.default == true).value;
    // this.selectedLang = this.appDefaultLang;
	}
  

  get currentLang() {
    if(localStorage.getItem('cms-lang')){
      this.selectedLang = localStorage.getItem('cms-lang') ?? '';
    }else{
      this.use(this.appDefaultLang);
    }
    return this.selectedLang;
  }

  get supportedLanguagesList(){
    return this.supportedLanguages;
  }

	public use(lang: string): void {
		// set selected language
    localStorage.setItem('cms-lang', lang);
		this.selectedLang = lang;
	}

	private translate(key: string): string {
		// private perform translation
		let translation = key;

    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			translation = this._translations[this.currentLang][key];
		}

		return translation;
	}


	public instant(key: string, inputList: any[] = []) {
		// public perform translation
    if(inputList.length > 0){
      // contain @{} in the lang files
      return this.translateWithInput(key, inputList);
    }else{
      return this.translate(key);
    }
	}

  private translateWithInput(key: string, list: any[] = []){
    var content = this.translate(key);
    let regex: any
    // replace content with index
    if(content.indexOf("@{0}") !== -1){
      regex = /@{\d}/g;
      return this.replaceContent(true, regex, content, list)
    }else{
      regex = /@{}/g;
      return this.replaceContent(false, regex, content, list)
    }
  }

  private replaceContent(withIndex: boolean, regex: any, content: string, list: any[] = []){
    let m: any;
    var listIndex = 0;
    var newContent = content;

    while ((m = regex.exec(content)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match: any) => {
        var replacedContent = "";
        if(withIndex == true){
          const numberRegex = /\d/g;
          let num = numberRegex.exec(match);
          let selectedIndex = num ? parseInt(num[0].toString()) : 0;
          // get list item by selectedIndex
          replacedContent = list[selectedIndex]? list[selectedIndex]: '';
        }else{
          // get list item by listIndex
          replacedContent = list[listIndex]? list[listIndex]: '';
        }
        // console.log(`${match}: ${replacedContent} - ${newContent}`);
        newContent = newContent.replace(match, replacedContent)
      });
      listIndex++;
    }
    return newContent;
  }

  public getTranslatedItem(key: string, lang: string){
    // console.log(lang)
    var translated_item = this._translations[lang][key];
		return translated_item;
  }
}
