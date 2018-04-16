/**
 * Required Angular Imports
 */
import { Injectable } from '@angular/core';


/**
 * Required Component View Translations
 */
/**
 * 
 */
import * as _ from 'lodash';

/**
 * A service that provides translations
 * @class TranslationService
 */
@Injectable()
export class TranslationService {

  /**
   * Map of all available translation objects
   */
  private componentTranslationsMap : Object = {
  };

  /**
   * Default language
   */
  private DEFAULT_LANG : string = 'english';
  /**
   * Current Language
   */
  private _currentLang : string;

  /**
   * Gets persisting language
   * @return {string} returns language name and not langauge code
   */
  getLanguage() : string {
    /* TODO: Actual Service call to get persisting language or session variable?, if error default to DEFAULT_LANG */
    this._currentLang = this.DEFAULT_LANG;

    return this._currentLang;
  }

  /**
   * Gets translations for module
   * @param {string} module string the module to get translations for  (e.g bacnetInterface, deviceMap)
   * @param {string} [language] string optional parameter to tell which language to get translations for. Defaults to persisting language.
   * @returns {object}
   */
  getTranslations( module : string, language ? : string ) : any {

    console.log('the module is:', module, language);
    let selectedLang : string;

    if (language) {
      selectedLang = language;
    } else {
      selectedLang = this.getLanguage();
    }


    return this.componentTranslationsMap[ module ][ selectedLang ];
  }

  /**
   * Gets translations for module type
   * @param {string} module string  the module to get translations for (e.g bacnetInterface, deviceMap)
   * @param {string} type string the type to get translations for (e.g labels, descriptions, errors)
   * @param {string} [language] string optional parameter to tell which language to get translations for. Defaults to persisting language.
   * @returns {object}
   */
  getTranslationsType( module : string, type : string, language ? : string ) : any {
    let selectedLang : string;

    if (language) {
      selectedLang = language;
    } else {
      selectedLang = this.getLanguage();
    }

    return this.componentTranslationsMap[ module ][ selectedLang ][ type ];
  }

  /**
   * Gets translations for exact module field
   * @param {string} module string the module to get translations for  (e.g bacnetInterface, deviceMap)
   * @param {string} type string the type to get translations for (e.g labels, descriptions, errors)
   * @param {string} field string the field to get translations for (e.g header_title, paragraph1, routed_network_number)
   * @param {string} [language] string optional parameter to tell which language to get translations for. Defaults to persisting language.
   * @returns {object}
   */
  getTranslationsField( module : string, type : string, field : string, language ? : string ) : any {
    let selectedLang : string;

    if (language) {
      selectedLang = language;
    } else {
      selectedLang = this.getLanguage();
    }

    return this.componentTranslationsMap[ module ][ selectedLang ][ type ][ field ];
  }

  /**
   * Filters language pack specific to a view
   * @param {array} languagePlugins
   * @param {string} viewName 
   * @returns {object}
   */
  public getFilteredLanguagePack(languagePlugins : Array<any> , viewName : string) { //ToDo
     let langPack : object;
    _.each(languagePlugins, function(languagePack : object) {
      if (languagePack['viewName'] === viewName ) {
        langPack =   languagePack;   
      }      
    });
    return langPack['viewTranslations'];
  }

}
