'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Crossfit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-86c9b67453af739031da4e7be00b4245"' : 'data-target="#xs-components-links-module-AppModule-86c9b67453af739031da4e7be00b4245"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-86c9b67453af739031da4e7be00b4245"' :
                                            'id="xs-components-links-module-AppModule-86c9b67453af739031da4e7be00b4245"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalLoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalLoginPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalRankingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalRankingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopoverFotoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopoverFotoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopoverLogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PopoverLogoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-ab7dca490a17542da7d8d667481b91c7"' : 'data-target="#xs-components-links-module-HomePageModule-ab7dca490a17542da7d8d667481b91c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-ab7dca490a17542da7d8d667481b91c7"' :
                                            'id="xs-components-links-module-HomePageModule-ab7dca490a17542da7d8d667481b91c7"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDiaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDiaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEditarPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEditarPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListPageModule.html" data-type="entity-link">ListPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ListPageModule-84510fec6be151253543ad541628ea31"' : 'data-target="#xs-components-links-module-ListPageModule-84510fec6be151253543ad541628ea31"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListPageModule-84510fec6be151253543ad541628ea31"' :
                                            'id="xs-components-links-module-ListPageModule-84510fec6be151253543ad541628ea31"' }>
                                            <li class="link">
                                                <a href="components/ListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalCreaUsuarioPageModule.html" data-type="entity-link">ModalCreaUsuarioPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalCreaUsuarioPageModule-0d5129235e7a8999b049aef29e838baa"' : 'data-target="#xs-components-links-module-ModalCreaUsuarioPageModule-0d5129235e7a8999b049aef29e838baa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalCreaUsuarioPageModule-0d5129235e7a8999b049aef29e838baa"' :
                                            'id="xs-components-links-module-ModalCreaUsuarioPageModule-0d5129235e7a8999b049aef29e838baa"' }>
                                            <li class="link">
                                                <a href="components/ModalCreaUsuarioPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalCreaUsuarioPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalDiaPageModule.html" data-type="entity-link">ModalDiaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalDiaPageModule-2420d1fcf1f810b577daa6c4afa01a77"' : 'data-target="#xs-components-links-module-ModalDiaPageModule-2420d1fcf1f810b577daa6c4afa01a77"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalDiaPageModule-2420d1fcf1f810b577daa6c4afa01a77"' :
                                            'id="xs-components-links-module-ModalDiaPageModule-2420d1fcf1f810b577daa6c4afa01a77"' }>
                                            <li class="link">
                                                <a href="components/ModalDiaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDiaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEditarPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEditarPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalEditarPageModule.html" data-type="entity-link">ModalEditarPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalEditarPageModule-e901525d7334eb0e1497e6b800099de3"' : 'data-target="#xs-components-links-module-ModalEditarPageModule-e901525d7334eb0e1497e6b800099de3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalEditarPageModule-e901525d7334eb0e1497e6b800099de3"' :
                                            'id="xs-components-links-module-ModalEditarPageModule-e901525d7334eb0e1497e6b800099de3"' }>
                                            <li class="link">
                                                <a href="components/ModalEditarPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalEditarPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalLoginPageModule.html" data-type="entity-link">ModalLoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalLoginPageModule-4e55e98e3a38fe490d9e1be58a21a707"' : 'data-target="#xs-components-links-module-ModalLoginPageModule-4e55e98e3a38fe490d9e1be58a21a707"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalLoginPageModule-4e55e98e3a38fe490d9e1be58a21a707"' :
                                            'id="xs-components-links-module-ModalLoginPageModule-4e55e98e3a38fe490d9e1be58a21a707"' }>
                                            <li class="link">
                                                <a href="components/ModalLoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalLoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToastModule.html" data-type="entity-link">ToastModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EncryptServiceService.html" data-type="entity-link">EncryptServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SemanaservicioService.html" data-type="entity-link">SemanaservicioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatosSesion.html" data-type="entity-link">DatosSesion</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});