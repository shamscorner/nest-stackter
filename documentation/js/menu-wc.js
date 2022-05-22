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
                    <a href="index.html" data-type="index-link">nest-starter-template documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-a45b6f12367b3991d25ac0c94fd0d72b2e4ebf1f36d40486fd7cae2e19e6c9e66eccfd05db781cb745bc70e4c26667433d317a3abd8bed1df4e21eb167aff7c1"' : 'data-target="#xs-controllers-links-module-AppModule-a45b6f12367b3991d25ac0c94fd0d72b2e4ebf1f36d40486fd7cae2e19e6c9e66eccfd05db781cb745bc70e4c26667433d317a3abd8bed1df4e21eb167aff7c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a45b6f12367b3991d25ac0c94fd0d72b2e4ebf1f36d40486fd7cae2e19e6c9e66eccfd05db781cb745bc70e4c26667433d317a3abd8bed1df4e21eb167aff7c1"' :
                                            'id="xs-controllers-links-module-AppModule-a45b6f12367b3991d25ac0c94fd0d72b2e4ebf1f36d40486fd7cae2e19e6c9e66eccfd05db781cb745bc70e4c26667433d317a3abd8bed1df4e21eb167aff7c1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' : 'data-target="#xs-controllers-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' : 'data-target="#xs-injectables-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-a01466882b6fe1f3286080f7f282811a7549a58b311cd22586eacd42fd7491e8bed5fc550fc9843212a1f25519733ef405fab6ee7524897b6549d18d3ebaa841"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtTwoFactorStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' : 'data-target="#xs-controllers-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' :
                                            'id="xs-controllers-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' : 'data-target="#xs-injectables-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' :
                                        'id="xs-injectables-links-module-CategoriesModule-7402683c8e5981db7de54ca88161b8fb987df3e195f46275cc207ce27f9541420424b079e0f30916055d14f08c6546fbf22ceba3ded4f5c290a5bfc10e510248"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' : 'data-target="#xs-controllers-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' :
                                            'id="xs-controllers-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' : 'data-target="#xs-injectables-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' :
                                        'id="xs-injectables-links-module-CommentsModule-5c89f4967574319e3e08cda38ed8589673cca92b856ab1aeb536021a5ca144700092ea6f128ffebdf3faf8555654f7f89ae8a92b5acc4b0cd4b1878a18104334"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseFilesModule.html" data-type="entity-link" >DatabaseFilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' : 'data-target="#xs-controllers-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' :
                                            'id="xs-controllers-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseFilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseFilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' : 'data-target="#xs-injectables-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' :
                                        'id="xs-injectables-links-module-DatabaseFilesModule-4bb7894715d6630e8ef74375e990809870fafbbcdca34690b4fa6a3f6ec84960a0ce4b652b95d31328dce54b97f8621ba8ec9b854a7c9d547562bcdadeb575fe"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseFilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseFilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-eeebbd15d006a846f72fa803cf59d2feef20585464423cf3194c9e1bdbebff9c3c74dcae5d9c297a72db98d9b2b114c9b3e70ca853fc0d90d1dc31c04728d289"' : 'data-target="#xs-injectables-links-module-FilesModule-eeebbd15d006a846f72fa803cf59d2feef20585464423cf3194c9e1bdbebff9c3c74dcae5d9c297a72db98d9b2b114c9b3e70ca853fc0d90d1dc31c04728d289"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-eeebbd15d006a846f72fa803cf59d2feef20585464423cf3194c9e1bdbebff9c3c74dcae5d9c297a72db98d9b2b114c9b3e70ca853fc0d90d1dc31c04728d289"' :
                                        'id="xs-injectables-links-module-FilesModule-eeebbd15d006a846f72fa803cf59d2feef20585464423cf3194c9e1bdbebff9c3c74dcae5d9c297a72db98d9b2b114c9b3e70ca853fc0d90d1dc31c04728d289"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' : 'data-target="#xs-controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' :
                                            'id="xs-controllers-links-module-HealthModule-f36e1750a0323d8a7d6bca097e0bc20c3e35791b6d788201b37fbaf94d08b8a4f10c6064f64d1a0ae5e97cab5a4f34fa333ad4aa67ac3ceb7a0eef9f0c24a97e"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LocalFilesModule.html" data-type="entity-link" >LocalFilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' : 'data-target="#xs-controllers-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' :
                                            'id="xs-controllers-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' }>
                                            <li class="link">
                                                <a href="controllers/LocalFilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalFilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' : 'data-target="#xs-injectables-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' :
                                        'id="xs-injectables-links-module-LocalFilesModule-f7fc63b2d7410e9ea8b954b6025f45b1a70641353c419f6630fab6faad51c71dadbca1cd29953d57f44af5bf1926a236d645ad119713063b1c3b83eff085d102"' }>
                                        <li class="link">
                                            <a href="injectables/LocalFilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalFilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-f65a7307baafea9ac8be4fbbc4a99d67bf69d0063527e5b0112964e3ec6890fc5e0842f2f58d902382a6990dd21d198ff7d97385cf6a1ee95da97a9dcd4d1b31"' : 'data-target="#xs-injectables-links-module-LoggerModule-f65a7307baafea9ac8be4fbbc4a99d67bf69d0063527e5b0112964e3ec6890fc5e0842f2f58d902382a6990dd21d198ff7d97385cf6a1ee95da97a9dcd4d1b31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-f65a7307baafea9ac8be4fbbc4a99d67bf69d0063527e5b0112964e3ec6890fc5e0842f2f58d902382a6990dd21d198ff7d97385cf6a1ee95da97a9dcd4d1b31"' :
                                        'id="xs-injectables-links-module-LoggerModule-f65a7307baafea9ac8be4fbbc4a99d67bf69d0063527e5b0112964e3ec6890fc5e0842f2f58d902382a6990dd21d198ff7d97385cf6a1ee95da97a9dcd4d1b31"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLogger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLogger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' : 'data-target="#xs-controllers-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' :
                                            'id="xs-controllers-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' : 'data-target="#xs-injectables-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' :
                                        'id="xs-injectables-links-module-PostsModule-2b84e7da0fff86ccf34d0af9f5ecff5084cd29442e397de196f7578541436ed7deaf5ac4aca5058fa336ee1cdebbc39eac168cd5e2e8a611ff23684bf53c9f35"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' : 'data-target="#xs-controllers-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' :
                                            'id="xs-controllers-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' : 'data-target="#xs-injectables-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' :
                                        'id="xs-injectables-links-module-ProductsModule-16670168f590081ad625ddf21485140e1fbf99ba5ada33032fe8d50eb87a0614aece2371908a7788acd13ac5053dcf5927190dee3b5e6d1f40c923dd27115b10"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' : 'data-target="#xs-controllers-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' :
                                            'id="xs-controllers-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' : 'data-target="#xs-injectables-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' :
                                        'id="xs-injectables-links-module-UsersModule-673cbf3ddb2341a9cb9e219add62b11cb4d743ec0d3f748e3f9eb5977f81bb757f7d942a3a9864e8efa8445a6fd776216f5c5a27838f68f724d45657b825c7c0"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Comment.html" data-type="entity-link" >Comment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DatabaseFile.html" data-type="entity-link" >DatabaseFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LocalFile.html" data-type="entity-link" >LocalFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Log.html" data-type="entity-link" >Log</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrivateFile.html" data-type="entity-link" >PrivateFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PublicFile.html" data-type="entity-link" >PublicFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CategoryNotFoundException.html" data-type="entity-link" >CategoryNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentCommand.html" data-type="entity-link" >CreateCommentCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentHandler.html" data-type="entity-link" >CreateCommentHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductCommand.html" data-type="entity-link" >CreateProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductHandler.html" data-type="entity-link" >CreateProductHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseLogger.html" data-type="entity-link" >DatabaseLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductCommand.html" data-type="entity-link" >DeleteProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductHandler.html" data-type="entity-link" >DeleteProductHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariables.html" data-type="entity-link" >EnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionsLoggerFilter.html" data-type="entity-link" >ExceptionsLoggerFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNotFoundException.html" data-type="entity-link" >FileNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseDto.html" data-type="entity-link" >FileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDto.html" data-type="entity-link" >FileUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadMultipleDto.html" data-type="entity-link" >FileUploadMultipleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllProductsHandler.html" data-type="entity-link" >FindAllProductsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllProductsQuery.html" data-type="entity-link" >FindAllProductsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneParams.html" data-type="entity-link" >FindOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindProductHandler.html" data-type="entity-link" >FindProductHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindProductQuery.html" data-type="entity-link" >FindProductQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsDto.html" data-type="entity-link" >GetCommentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsHandler.html" data-type="entity-link" >GetCommentsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsQuery.html" data-type="entity-link" >GetCommentsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductDto.html" data-type="entity-link" >GetProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogInDto.html" data-type="entity-link" >LogInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectWithIdDto.html" data-type="entity-link" >ObjectWithIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedResultDto.html" data-type="entity-link" >PaginatedResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostNotFoundException.html" data-type="entity-link" >PostNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductNotFoundException.html" data-type="entity-link" >ProductNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorAuthenticationCodeDto.html" data-type="entity-link" >TwoFactorAuthenticationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeOrmConfig.html" data-type="entity-link" >TypeOrmConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductCommand.html" data-type="entity-link" >UpdateProductCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductHandler.html" data-type="entity-link" >UpdateProductHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
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
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link" >ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthenticationGuard.html" data-type="entity-link" >JwtAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorGuard.html" data-type="entity-link" >JwtTwoFactorGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthenticationGuard.html" data-type="entity-link" >LocalAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsMiddleware.html" data-type="entity-link" >LogsMiddleware</a>
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
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BookProperties.html" data-type="entity-link" >BookProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarProperties.html" data-type="entity-link" >CarProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalFileDto.html" data-type="entity-link" >LocalFileDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalFilesInterceptorOptions.html" data-type="entity-link" >LocalFilesInterceptorOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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