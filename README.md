 _______  ______ _______ _     _ _____ _______ _______ _     _ _______ _     _  ______     
 |_____| |_____/ |       |_____|   |      |    |______ |____/     |    |     | |_____/     
 |     | |    \_ |_____  |     | __|__    |    |______ |    \_    |    |_____| |    \_     
                                                                                           
 _______ _     _ _______ _     _ _______                                                   
 |______ |     | |       |_____| |______                                                   
 ______| |_____| |_____  |     | |______                                                   
                                                                                           
 _     _ _____                                                                             
 |     |   |                                                                               
 |_____| __|__                                                                             
                                                                                           

     
              -= SPA link in browser =-
a) from Cloud9:
<cloud9ApiHost>
==============================================================
b) from managed Azure (DEV):
<proxyApiHost>


             -= Proxy API call examples =-
a) hosted in Cloud9:
search:         <cloud9ApiHost>/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion: <cloud9ApiHost>/v1/get-autocomplete?search=KOW
==============================================================

b) hosted in managed Azure:
search:          <proxyApiHost>/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion:  <proxyApiHost>/v1/get-autocomplete?search=KOW



    -= Call Azuresearch directly from public Azure cloud (NON-PROXY) =-
search:          <azureHostName>/indexes/arch-search/docs?api-version=2016-09-01&$count=true&searchMode=all&search=KOWIN&$filter=(artefactType eq 'Application' or artefactType eq 'ApprovedElement') and (lifecycle eq 'planned' or lifecycle eq 'active' or lifecycle eq 'retired')&scoringProfile=arch-score
autocompletion:  <azureHostName>/indexes/arch-search/docs/suggest?suggesterName=sg&$orderby=name&api-version=2016-09-018&search=KOW

