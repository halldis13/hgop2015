#HGOP2015

###Vagrant: 
Hjálpar til við að búa til og setja upp sýndarvélar

###Virtual Box: 
Sýndarvél sem hægt er að setja upp á margskonar tegundir af tölvun.

###Grunt: 
er tól fyrir javascript forrit sem m.a. sameinar forrit, villugreinir þau, keyrir test eða minifyerar þau.

###Npm: 
Er package manager fyrir javascript keyrsluumhverfið Node.js

###Nodejs: 
Er keyrsluumhverfi fyrir þróun á server-side vefforrit

###Bower: 
er package manager fyrir Javascript, hægt að skilgreina, útgáfustýra og sækja nauðsynlegar viðbætur 

###Docker: 
Hjálpar til við að pakka forritinu þínu og öllum viðbótum í Image til að auðvelda hugbúnaðarþróun.

###Jenkins:
Er Continuous Integration & Delivery tól. Þar er hægt að Builda og Testa.

###Karma:

###Mocha: 
Er test framework fyrir javascript

###q: 
verður að vera installað til að hægt sé að nota memory store

-----
###day 2: 
####Topology of the deployment path: 
docker Imageinu er pushað frá dev-vélinni og þaðan er ssh-að inn á test-vélina og pullað Image-inu. Þá er kill-að containerinn og eytt honum og hann keyrður aftur upp.

#Jenkins Skriftur
##Commit Stage:
Build: .dockerbuild.sh
##Acceptance Stage:
AcceptanceTest: ./acceptancetest.sh
##DeployStage:
Deploy To Dev: ./deploytodev.sh  
Deploy To Test: ./deploytotest.sh  


Open Firefox: 
export DISPLAY=:0  
firefox
