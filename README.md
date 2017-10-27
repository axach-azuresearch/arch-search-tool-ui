 _______  ______ _______ _     _ _____ _______ _______ _     _ _______ _     _  ______     
 |_____| |_____/ |       |_____|   |      |    |______ |____/     |    |     | |_____/     
 |     | |    \_ |_____  |     | __|__    |    |______ |    \_    |    |_____| |    \_     
                                                                                           
 _______ _     _ _______ _     _ _______                                                   
 |______ |     | |       |_____| |______                                                   
 ______| |_____| |_____  |     | |______                                                   
                                                                                           
 _     _ _____                                                                             
 |     |   |                                                                               
 |_____| __|__                                                                             
                                                                                           

              -= GIT Cheatsheet =- 
     http://ndpsoftware.com/git-cheatsheet.html
     


              -= SPA link in browser =-
a) from Cloud9:
https://arch-search-tool-ui-mikhailbro.c9users.io
==============================================================
b) from public Azure:
https://arch-search-tool-ui.azurewebsites.net
==============================================================
c) from managed Azure (DEV):
https://arch-search-ui.azurepaas-internal.dev.axa-ch.intraxa



             -= Proxy API call examples =-
a) hosted in Cloud9:
search:         https://arch-search-proxy-mikhailbro.c9users.io/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion: https://arch-search-proxy-mikhailbro.c9users.io/v1/get-autocomplete?search=KOW
==============================================================

b) hosted in public Azure:
search:          https://arch-search-proxy.azurewebsites.net/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion:  https://arch-search-proxy.azurewebsites.net/v1/get-autocomplete?search=KOW
==============================================================

c) hosted in managed Azure:
search:          https://arch-search-proxy.azurepaas-internal.dev.axa-ch.intraxa/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion:  https://arch-search-proxy.azurepaas-internal.dev.axa-ch.intraxa/v1/get-autocomplete?search=KOW



    -= Call Azuresearch directly from public Azure cloud (NON-PROXY) =-
search:          https://xxx/indexes/arch-search/docs?api-version=2016-09-01&$count=true&searchMode=all&search=KOWIN&$filter=(artefactType eq 'Application' or artefactType eq 'ApprovedElement') and (lifecycle eq 'planned' or lifecycle eq 'active' or lifecycle eq 'retired')&scoringProfile=arch-score
autocompletion:  https://xxx/indexes/arch-search/docs/suggest?suggesterName=sg&$orderby=name&api-version=2016-09-018&search=KOW

