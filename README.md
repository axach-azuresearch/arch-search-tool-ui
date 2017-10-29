### _SPA link in browser_
* from Cloud9:
```
<cloud9ApiHost>
```
* from managed Azure (DEV):
```
<proxyApiHost>
```

### _Proxy API call examples_
* hosted in Cloud9:
```
search:         <cloud9ApiHost>/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion: <cloud9ApiHost>/v1/get-autocomplete?search=KOW
```
* hosted in managed Azure:
```
search:          <proxyApiHost>/v1/get-search?search=KOWIN&scoringProfile=arch-score&$count=true
autocompletion:  <proxyApiHost>/v1/get-autocomplete?search=KOW
```

### _Non-proxy Azure search calls from public Azure cloud_
```
search:          <azureHostName>/indexes/arch-search/docs?api-version=2016-09-01&$count=true&searchMode=all&search=KOWIN&$filter=(artefactType eq 'Application' or artefactType eq 'ApprovedElement') and (lifecycle eq 'planned' or lifecycle eq 'active' or lifecycle eq 'retired')&scoringProfile=arch-score
autocompletion:  <azureHostName>/indexes/arch-search/docs/suggest?suggesterName=sg&$orderby=name&api-version=2016-09-018&search=KOW
```
