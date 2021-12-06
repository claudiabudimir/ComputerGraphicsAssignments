//Maya ASCII 2018 scene
//Name: cap.ma
//Last modified: Tue, Dec 24, 2019 01:05:09 PM
//Codeset: 936
requires maya "2018";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya 2018";
fileInfo "version" "2018";
fileInfo "cutIdentifier" "201706261615-f9658c4cfc";
fileInfo "osv" "Microsoft Windows 8 Home Premium Edition, 64-bit  (Build 9200)\n";
createNode transform -s -n "persp";
	rename -uid "942D60F4-4886-CA9F-234C-0A9D174837A6";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0.28495701243428917 1.4471106398282119 4.6612779438851062 ;
	setAttr ".r" -type "double3" -16.538352736623843 -2522.1999999989507 1.4919847243909263e-16 ;
createNode camera -s -n "perspShape" -p "persp";
	rename -uid "D4F4909A-4BF8-4C75-3696-119AE675478D";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999993;
	setAttr ".coi" 5.3267999950343459;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
	setAttr ".tp" -type "double3" 0.31590400636196136 0.95196112990379333 0.1031164824962616 ;
	setAttr ".hc" -type "string" "viewSet -p %camera";
createNode transform -s -n "top";
	rename -uid "D5ED1FE6-4981-7541-641B-83A7E8FA9ABB";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 1000.1 0 ;
	setAttr ".r" -type "double3" -89.999999999999986 0 0 ;
createNode camera -s -n "topShape" -p "top";
	rename -uid "12779F25-4F8E-C8AB-3750-9A9E60E03D20";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "top";
	setAttr ".den" -type "string" "top_depth";
	setAttr ".man" -type "string" "top_mask";
	setAttr ".hc" -type "string" "viewSet -t %camera";
	setAttr ".o" yes;
createNode transform -s -n "front";
	rename -uid "988D956B-476E-ACC6-3174-B09D1138DA14";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 0 1000.1 ;
createNode camera -s -n "frontShape" -p "front";
	rename -uid "C8E78FA2-47A3-B94A-4801-AEA682DE5AD4";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "front";
	setAttr ".den" -type "string" "front_depth";
	setAttr ".man" -type "string" "front_mask";
	setAttr ".hc" -type "string" "viewSet -f %camera";
	setAttr ".o" yes;
createNode transform -s -n "side";
	rename -uid "352F2BB5-4E97-0C76-CC6C-229C09EE8B3D";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 1000.1 0 0 ;
	setAttr ".r" -type "double3" 0 89.999999999999986 0 ;
createNode camera -s -n "sideShape" -p "side";
	rename -uid "6C7D5CCB-4475-3E72-9A69-12B805537BFE";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "side";
	setAttr ".den" -type "string" "side_depth";
	setAttr ".man" -type "string" "side_mask";
	setAttr ".hc" -type "string" "viewSet -s %camera";
	setAttr ".o" yes;
createNode transform -n "pCube1";
	rename -uid "03D075E7-4673-49B7-9EC0-38A9C42911D9";
createNode mesh -n "pCubeShape1" -p "pCube1";
	rename -uid "71BA0E7B-4394-F366-4477-5A8394A0414D";
	setAttr -k off ".v";
	setAttr -s 2 ".iog";
	setAttr ".vir" yes;
	setAttr ".vif" yes;
	setAttr ".pv" -type "double2" 0.63730627162060016 0.85694131982177302 ;
	setAttr -s 2 ".uvst";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr ".covm[0]"  0 1 1;
	setAttr ".cdvm[0]"  0 1 1;
	setAttr ".dr" 1;
createNode lightLinker -s -n "lightLinker1";
	rename -uid "587FF9F2-4BB9-E85B-3C5B-63AE1A51F063";
	setAttr -s 2 ".lnk";
	setAttr -s 2 ".slnk";
createNode shapeEditorManager -n "shapeEditorManager";
	rename -uid "0836905B-483C-8698-5F8F-32B925C73BDD";
createNode poseInterpolatorManager -n "poseInterpolatorManager";
	rename -uid "116310FB-49BF-8E24-4A29-CE990059E390";
createNode displayLayerManager -n "layerManager";
	rename -uid "B1422F51-4795-0B7B-CCF8-33B07CE37CAA";
createNode displayLayer -n "defaultLayer";
	rename -uid "F4C7D363-4B2D-411F-C99E-85AB8E9C2D86";
createNode renderLayerManager -n "renderLayerManager";
	rename -uid "36B6A659-4D8C-07EB-7A9C-58B6E589641B";
createNode renderLayer -n "defaultRenderLayer";
	rename -uid "131FED15-442A-4A27-1015-89A75F40A400";
	setAttr ".g" yes;
createNode polyCube -n "polyCube1";
	rename -uid "9BC37F7E-4B76-8B31-7D84-5B9259741C72";
	setAttr ".cuv" 4;
createNode polyExtrudeFace -n "polyExtrudeFace1";
	rename -uid "D68DE3A9-467F-34D7-5B52-EC9A9CA671D0";
	setAttr ".ics" -type "componentList" 1 "f[1]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" 0 0.035282701 0 ;
	setAttr ".rs" 44065;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.25086286664009094 0.035282701253890991 -0.25086286664009094 ;
	setAttr ".cbx" -type "double3" 0.25086286664009094 0.035282701253890991 0.25086286664009094 ;
createNode polyTweak -n "polyTweak1";
	rename -uid "0CF5F911-402C-C68D-C7D6-96BCDB6C917A";
	setAttr ".uopa" yes;
	setAttr -s 4 ".tk[2:5]" -type "float3"  0.24913713 -0.4647173 -0.24913713
		 -0.24913713 -0.4647173 -0.24913713 0.24913713 -0.4647173 0.24913713 -0.24913713 -0.4647173
		 0.24913713;
createNode polyExtrudeFace -n "polyExtrudeFace2";
	rename -uid "E443FDCD-40B9-8486-EDEF-F9BC0E8AD5FB";
	setAttr ".ics" -type "componentList" 1 "f[1]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.43630165 0.64318681 0.057280563 ;
	setAttr ".rs" 60035;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.49480295181274414 0.56031382083892822 -0.018591344356536865 ;
	setAttr ".cbx" -type "double3" -0.37780037522315979 0.72605979442596436 0.13315246999263763 ;
createNode polyTweak -n "polyTweak2";
	rename -uid "2DDE9654-4FF0-1A2E-59C3-A5805AF3B332";
	setAttr ".uopa" yes;
	setAttr -s 4 ".tk[8:11]" -type "float3"  -0.19926113 0.52503109 -0.11941721
		 -0.62866324 0.66604638 -0.1177104 -0.67334193 0.69077706 0.23397826 -0.2439401 0.54976177
		 0.23227152;
createNode polySplitRing -n "polySplitRing1";
	rename -uid "C783FFE0-481A-161C-C781-B68E30909D4A";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 2 "e[4:5]" "e[8:9]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".wt" 0.21303404867649078;
	setAttr ".re" 4;
	setAttr ".sma" 29.999999999999996;
	setAttr ".p[0]"  0 0 1;
	setAttr ".fq" yes;
createNode polyTweak -n "polyTweak3";
	rename -uid "6CACCC49-44B3-BF99-18E3-8A8A2E5C3F6D";
	setAttr ".uopa" yes;
	setAttr -s 4 ".tk[12:15]" -type "float3"  -0.25831631 0.29662395 0.0066349395
		 -0.30814928 0.19946054 0.005458904 -0.27736446 0.18242042 0.10883854 -0.22753125
		 0.27958381 0.11001451;
createNode polyExtrudeFace -n "polyExtrudeFace3";
	rename -uid "6F0A358C-4683-5B1D-7BA0-4D80B866AF54";
	setAttr ".ics" -type "componentList" 1 "f[1]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.70414191 0.88270897 0.11501726 ;
	setAttr ".rs" 48477;
	setAttr ".lt" -type "double3" -0.022753949943209464 0.032406739182036376 0.063107024918168622 ;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.72233420610427856 0.85693776607513428 0.091423153877258301 ;
	setAttr ".cbx" -type "double3" -0.68594968318939209 0.90848022699356079 0.13861136138439178 ;
createNode polyExtrudeFace -n "polyExtrudeFace4";
	rename -uid "9C90F71B-478F-CB41-4E8E-768E684551E9";
	setAttr ".ics" -type "componentList" 1 "f[1]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.72953194 0.89263397 0.12221171 ;
	setAttr ".rs" 40753;
	setAttr ".lt" -type "double3" -3.8163916471489756e-17 2.4286128663675299e-17 0.084925745715129106 ;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.76234406232833862 0.84615218639373779 0.079656653106212616 ;
	setAttr ".cbx" -type "double3" -0.69671982526779175 0.93911576271057129 0.16476675868034363 ;
createNode polyTweak -n "polyTweak4";
	rename -uid "133E41AB-4622-4627-ADAD-2A89F62A6C2E";
	setAttr ".uopa" yes;
	setAttr -s 8 ".tk";
	setAttr ".tk[12]" -type "float3" 0 -7.4505806e-09 -1.8626451e-08 ;
	setAttr ".tk[13]" -type "float3" 0 -3.7252903e-09 -1.1175871e-08 ;
	setAttr ".tk[14]" -type "float3" 0 -3.7252903e-09 -1.6763806e-08 ;
	setAttr ".tk[15]" -type "float3" 0 -7.4505806e-09 -1.4901161e-08 ;
	setAttr ".tk[20]" -type "float3" 0.036621273 -0.041954178 0.042852316 ;
	setAttr ".tk[21]" -type "float3" 0.054695424 -0.0067134788 0.043278869 ;
	setAttr ".tk[22]" -type "float3" 0.043529913 -0.00053305516 0.0057835137 ;
	setAttr ".tk[23]" -type "float3" 0.025455691 -0.03577381 0.0053569744 ;
createNode polySplit -n "polySplit1";
	rename -uid "E9A2C488-47F2-C984-C69C-CD9FDF850BFE";
	setAttr -s 3 ".e[0:2]"  0.42363301 0.57800102 0.42177701;
	setAttr -s 3 ".d[0:2]"  -2147483647 -2147483613 -2147483648;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit2";
	rename -uid "25002C19-47E8-68FF-212B-B2A0644D0BEB";
	setAttr -s 3 ".e[0:2]"  0.49556601 0.429391 0.41919801;
	setAttr -s 3 ".d[0:2]"  -2147483641 -2147483614 -2147483637;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit3";
	rename -uid "1CA0963F-426C-8919-01F5-139F4FAC9F9C";
	setAttr -s 3 ".e[0:2]"  0.39546499 0.48908201 0.50179702;
	setAttr -s 3 ".d[0:2]"  -2147483646 -2147483616 -2147483645;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit4";
	rename -uid "E596378D-453A-DE0A-9600-868DFC1FE7AA";
	setAttr -s 3 ".e[0:2]"  0.53866798 0.47562799 0.53293401;
	setAttr -s 3 ".d[0:2]"  -2147483642 -2147483618 -2147483638;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyExtrudeFace -n "polyExtrudeFace5";
	rename -uid "6248878D-4FE8-F296-4F21-759A2D2188C6";
	setAttr ".ics" -type "componentList" 7 "f[0]" "f[2]" "f[4:5]" "f[27]" "f[29]" "f[31]" "f[33]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.031123847 -0.44298327 0.0016180873 ;
	setAttr ".rs" 42925;
	setAttr ".lt" -type "double3" -3.8163916471489756e-17 -2.0816681711721685e-16 0.12512543053060829 ;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.72726130485534668 -0.5 -0.67078346014022827 ;
	setAttr ".cbx" -type "double3" 0.66501361131668091 -0.38596653938293457 0.67401963472366333 ;
createNode polyTweak -n "polyTweak5";
	rename -uid "C96E674D-4A68-EB61-B3BA-8F98785E81E6";
	setAttr ".uopa" yes;
	setAttr -s 16 ".tk";
	setAttr ".tk[29]" -type "float3" 0.019284174 0 0.17401963 ;
	setAttr ".tk[30]" -type "float3" 0.019284174 0 0.17401963 ;
	setAttr ".tk[32]" -type "float3" 0.16501363 0 0.083192952 ;
	setAttr ".tk[33]" -type "float3" 0.16501363 0 0.083192952 ;
	setAttr ".tk[35]" -type "float3" 0 0 -0.17078346 ;
	setAttr ".tk[36]" -type "float3" 0 0 -0.17078346 ;
	setAttr ".tk[38]" -type "float3" -0.22265287 0 0 ;
	setAttr ".tk[39]" -type "float3" -0.2272613 0 0 ;
createNode polyExtrudeFace -n "polyExtrudeFace6";
	rename -uid "4C5CCB2D-462C-6E69-49A8-B9B1B2B45C1D";
	setAttr ".ics" -type "componentList" 6 "f[35:36]" "f[39]" "f[41]" "f[43]" "f[45:46]" "f[49]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.026019871 -0.39331961 0.00136289 ;
	setAttr ".rs" 63443;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.76897752285003662 -0.40067267417907715 -0.72227281332015991 ;
	setAttr ".cbx" -type "double3" 0.71693778038024902 -0.38596653938293457 0.7249985933303833 ;
createNode polyTweak -n "polyTweak6";
	rename -uid "82AC8B30-4737-D79E-41E7-28B28B4EDF60";
	setAttr ".uopa" yes;
	setAttr -s 17 ".tk";
	setAttr ".tk[40]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[41]" -type "float3" 0.0029586761 -0.070355371 -0.06698212 ;
	setAttr ".tk[42]" -type "float3" -0.051631916 -0.070192106 -0.049207628 ;
	setAttr ".tk[43]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[44]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[45]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[46]" -type "float3" -0.0025508057 -0.070342481 0.06698212 ;
	setAttr ".tk[47]" -type "float3" 0.046695974 -0.070285074 0.049734995 ;
	setAttr ".tk[48]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[49]" -type "float3" -0.06884715 -0.070332557 -0.00018766327 ;
	setAttr ".tk[50]" -type "float3" -0.051657818 -0.070496842 0.049248025 ;
	setAttr ".tk[51]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[52]" -type "float3" 0 -0.070379905 0 ;
	setAttr ".tk[53]" -type "float3" 0.06884715 -0.070511334 -0.0028791507 ;
	setAttr ".tk[54]" -type "float3" 0.046705738 -0.070567705 -0.049516786 ;
	setAttr ".tk[55]" -type "float3" 0 -0.070379905 0 ;
createNode polyTweak -n "polyTweak7";
	rename -uid "CCFFDC3F-4590-3FE7-833B-3E82CAA1949F";
	setAttr ".uopa" yes;
	setAttr -s 17 ".tk";
	setAttr ".tk[56]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[57]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[58]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[59]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[60]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[61]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[62]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[63]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[64]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[65]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[66]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[67]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[68]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[69]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[70]" -type "float3" 0 0.068878002 0 ;
	setAttr ".tk[71]" -type "float3" 0 0.068878002 0 ;
createNode polySplit -n "polySplit5";
	rename -uid "77CBED78-4AA6-F59B-6A8B-35A5DD68632E";
	setAttr -s 2 ".e[0:1]"  1 0.52474397;
	setAttr -s 2 ".d[0:1]"  -2147483643 -2147483634;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit6";
	rename -uid "EA1B979B-4C05-CCD6-297E-F0960CC11E15";
	setAttr -s 6 ".e[0:5]"  0.45447999 0.48445001 0.51161599 0.53482002
		 0.486426 0.45447999;
	setAttr -s 6 ".d[0:5]"  -2147483637 -2147483511 -2147483635 -2147483633 -2147483638 -2147483637;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit7";
	rename -uid "3D17E81D-4294-7D6C-93E0-D0A497A4F46C";
	setAttr -s 3 ".e[0:2]"  1 0.49626201 0.45776799;
	setAttr -s 3 ".d[0:2]"  -2147483647 -2147483501 -2147483636;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak8";
	rename -uid "D6F69551-46D3-EBB1-27B4-CCAD280F7282";
	setAttr ".uopa" yes;
	setAttr -s 7 ".tk";
	setAttr ".tk[28]" -type "float3" 0 0 0.10681841 ;
	setAttr ".tk[31]" -type "float3" 0.072781868 0.053984586 0 ;
	setAttr ".tk[34]" -type "float3" 0 0 -0.074974939 ;
	setAttr ".tk[37]" -type "float3" -0.16659701 0.017003333 0 ;
	setAttr ".tk[74]" -type "float3" 0.047091894 0.029876687 0 ;
	setAttr ".tk[77]" -type "float3" 0.062669359 0.011469289 -0.025968267 ;
createNode polySplit -n "polySplit8";
	rename -uid "86BC543E-429B-1557-F309-B9B6097DEDDF";
	setAttr -s 3 ".e[0:2]"  0 0.50708097 0.64369398;
	setAttr -s 3 ".d[0:2]"  -2147483588 -2147483502 -2147483631;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplitRing -n "polySplitRing2";
	rename -uid "34B4696D-45F9-C387-9206-2C9F39F9B25E";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 3 "e[40:41]" "e[43]" "e[45]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".wt" 0.52823549509048462;
	setAttr ".dr" no;
	setAttr ".re" 41;
	setAttr ".sma" 29.999999999999996;
	setAttr ".p[0]"  0 0 1;
	setAttr ".fq" yes;
createNode polyTweak -n "polyTweak9";
	rename -uid "6B223D0C-4B9D-A238-05B6-D287C036B437";
	setAttr ".uopa" yes;
	setAttr -s 24 ".tk";
	setAttr ".tk[8]" -type "float3" 0.07463713 -0.031552766 -0.017847238 ;
	setAttr ".tk[9]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[10]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[11]" -type "float3" 0.07463713 -0.031552766 -0.017847238 ;
	setAttr ".tk[12]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[13]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[14]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[15]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[20]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[21]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[22]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[23]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[24]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[25]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[26]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[27]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[37]" -type "float3" 0.024991803 -0.015343228 0.061765663 ;
	setAttr ".tk[72]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[73]" -type "float3" 0.020168239 0.039153464 -0.0081521869 ;
	setAttr ".tk[74]" -type "float3" 0.020168239 0.039153464 -0.0081521869 ;
	setAttr ".tk[75]" -type "float3" 0.020168239 0.039153464 -0.0081521869 ;
	setAttr ".tk[79]" -type "float3" 0.11419984 -0.031552766 -0.026690548 ;
	setAttr ".tk[80]" -type "float3" -0.065450735 0 0 ;
	setAttr ".tk[81]" -type "float3" 0.07463713 -0.031552766 -0.017847238 ;
createNode polyTweak -n "polyTweak10";
	rename -uid "4B59911F-4ECB-113F-AC4E-CAA7EBAA59A3";
	setAttr ".uopa" yes;
	setAttr -s 8 ".tk";
	setAttr ".tk[24]" -type "float3" -0.042350117 0.021560082 0.0067638364 ;
	setAttr ".tk[25]" -type "float3" -0.042350117 0.021560082 0.0067638364 ;
	setAttr ".tk[26]" -type "float3" -0.042350117 0.021560082 0.0067638364 ;
	setAttr ".tk[27]" -type "float3" -0.042350117 0.021560082 0.0067638364 ;
	setAttr ".tk[82]" -type "float3" 0.0050063031 0.029230908 0.029178137 ;
	setAttr ".tk[83]" -type "float3" -0.020595644 -0.020687368 0.028573928 ;
	setAttr ".tk[84]" -type "float3" -0.03641161 -0.011932882 -0.024538023 ;
	setAttr ".tk[85]" -type "float3" -0.010809589 0.037985422 -0.023933841 ;
createNode polySplit -n "polySplit9";
	rename -uid "322C45C4-4242-C3EF-2D9D-D589A3FD28DF";
	setAttr -s 2 ".e[0:1]"  0.42451099 0;
	setAttr -s 2 ".d[0:1]"  -2147483503 -2147483592;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit10";
	rename -uid "3391B5AD-4B51-FF0F-C86E-5B9AA3732137";
	setAttr -s 2 ".e[0:1]"  1 0.439973;
	setAttr -s 2 ".d[0:1]"  -2147483503 -2147483632;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak11";
	rename -uid "36F53A91-4EF4-ADF3-CF07-278EDED74F19";
	setAttr ".uopa" yes;
	setAttr -s 88 ".tk[0:87]" -type "float3"  -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586
		 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 0.037307099 0.0069026495 -0.024717178
		 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284
		 -0.00075896049 -0.0051244586 -0.019882284 0.046800196 0.027992954 0.047296144 -0.00075896049
		 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049
		 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049
		 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586 -0.019882284 -0.00075896049
		 -0.0051244586 -0.019882284 -0.00075896049 -0.0051244586 -0.071104862 -0.00075896049
		 -0.0051244586 -0.052820459;
createNode polySplit -n "polySplit11";
	rename -uid "D4031A17-4D34-B386-54A7-F6886689B04E";
	setAttr -s 2 ".e[0:1]"  0.48930401 0.52832001;
	setAttr -s 2 ".d[0:1]"  -2147483546 -2147483550;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak12";
	rename -uid "9618AE95-44D3-C228-3572-C5BA6E04572F";
	setAttr ".uopa" yes;
	setAttr -s 2 ".tk[88:89]" -type "float3"  2.220446e-16 0.036155507 0.060639262
		 0 0.03410551 0;
createNode polySplit -n "polySplit12";
	rename -uid "7A4559A7-4AC1-B822-7DF4-7499A3B38CCC";
	setAttr -s 3 ".e[0:2]"  1 0.443883 0.55639797;
	setAttr -s 3 ".d[0:2]"  -2147483546 -2147483579 -2147483581;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyExtrudeFace -n "polyExtrudeFace7";
	rename -uid "0B5DBC99-45D2-08CE-82F0-CE97E2130F9E";
	setAttr ".ics" -type "componentList" 1 "f[3]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.031882793 -0.50512445 -0.018264174 ;
	setAttr ".rs" 44568;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.72802025079727173 -0.50512444972991943 -0.69066572189331055 ;
	setAttr ".cbx" -type "double3" 0.66425466537475586 -0.50512444972991943 0.65413737297058105 ;
createNode polyTweak -n "polyTweak13";
	rename -uid "BDA1617E-4E77-EB00-FB69-36AC14DB7EEA";
	setAttr ".uopa" yes;
	setAttr -s 2 ".tk[90:91]" -type "float3"  -2.220446e-16 -0.03174524
		 0.058063578 0 -0.038544837 0.05862372;
createNode polyExtrudeFace -n "polyExtrudeFace8";
	rename -uid "A044DC4D-4B75-AB6D-DDB2-A4942CD6B3AC";
	setAttr ".ics" -type "componentList" 1 "f[3]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pvt" -type "float3" -0.031882793 -0.50512445 -0.018264174 ;
	setAttr ".rs" 52794;
	setAttr ".c[0]"  0 1 1;
	setAttr ".cbn" -type "double3" -0.5562165379524231 -0.50512444972991943 -0.5247199535369873 ;
	setAttr ".cbx" -type "double3" 0.49245095252990723 -0.50512444972991943 0.48819160461425781 ;
createNode polyTweak -n "polyTweak14";
	rename -uid "FB18A986-4640-F886-D168-F1BB78F9658B";
	setAttr ".uopa" yes;
	setAttr -s 8 ".tk[92:99]" -type "float3"  0.11571661 0 0.12379715 -0.0081247296
		 0 0.16594577 -0.131079 0 0.12379715 -0.1718037 0 -0.00019073935 -0.131079 0 -0.12299847
		 0.0068646204 0 -0.16594577 0.11571661 0 -0.12299847 0.1718037 0 -0.0077286335;
createNode polySplitRing -n "polySplitRing3";
	rename -uid "6670905B-4076-618D-D95B-B7A911F9049C";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 3 "e[32:33]" "e[35]" "e[37]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".wt" 0.25430440902709961;
	setAttr ".re" 32;
	setAttr ".sma" 29.999999999999996;
	setAttr ".p[0]"  0 0 1;
	setAttr ".fq" yes;
createNode polyTweak -n "polyTweak15";
	rename -uid "D565C882-4D4A-C331-3810-2C918531826A";
	setAttr ".uopa" yes;
	setAttr -s 40 ".tk";
	setAttr ".tk[8]" -type "float3" 0.5489465 0.17803665 -0.072673216 ;
	setAttr ".tk[9]" -type "float3" 0.56904101 -0.072447658 -0.010287055 ;
	setAttr ".tk[10]" -type "float3" 0.66973603 -0.1004261 -0.0084746117 ;
	setAttr ".tk[11]" -type "float3" 0.64964205 0.15005831 -0.070860907 ;
	setAttr ".tk[12]" -type "float3" 1.028484 0.032757096 -0.037154872 ;
	setAttr ".tk[13]" -type "float3" 1.0394362 -0.043525264 -0.021594133 ;
	setAttr ".tk[14]" -type "float3" 1.0697294 -0.057175785 -0.021030549 ;
	setAttr ".tk[15]" -type "float3" 1.0587772 0.019106932 -0.036591325 ;
	setAttr ".tk[20]" -type "float3" 1.0544525 0.081314191 -0.049642 ;
	setAttr ".tk[21]" -type "float3" 1.0742061 -0.05627108 -0.021576192 ;
	setAttr ".tk[22]" -type "float3" 1.128844 -0.080891632 -0.020559598 ;
	setAttr ".tk[23]" -type "float3" 1.1090903 0.056694023 -0.048625514 ;
	setAttr ".tk[24]" -type "float3" 1.2578965 0.12047198 -0.074017502 ;
	setAttr ".tk[25]" -type "float3" 1.2776501 -0.017113047 -0.045951668 ;
	setAttr ".tk[26]" -type "float3" 1.3322878 -0.041733593 -0.044935055 ;
	setAttr ".tk[27]" -type "float3" 1.3125341 0.095851928 -0.073001064 ;
	setAttr ".tk[72]" -type "float3" 0.62188011 -0.087129138 -0.0093359901 ;
	setAttr ".tk[73]" -type "float3" 0.20953254 -0.10450003 -0.0013701619 ;
	setAttr ".tk[74]" -type "float3" 0.29525346 -0.20015198 0.040524304 ;
	setAttr ".tk[75]" -type "float3" 0.38841468 -0.12128763 0.013500549 ;
	setAttr ".tk[76]" -type "float3" 0.45604801 0.16962081 -0.098847836 ;
	setAttr ".tk[77]" -type "float3" 0.28932735 0.1418096 -0.09546072 ;
	setAttr ".tk[78]" -type "float3" 0.22476767 0.02240216 -0.051034354 ;
	setAttr ".tk[79]" -type "float3" 0.53618413 0.04147952 -0.037419893 ;
	setAttr ".tk[80]" -type "float3" 0.40333012 0.20819505 -0.11657576 ;
	setAttr ".tk[81]" -type "float3" 0.61376387 0.16002703 -0.071506642 ;
	setAttr ".tk[82]" -type "float3" 1.1593047 -0.074104689 -0.024408087 ;
	setAttr ".tk[83]" -type "float3" 1.1270841 0.15031545 -0.070187382 ;
	setAttr ".tk[84]" -type "float3" 1.2162061 0.11015645 -0.068529256 ;
	setAttr ".tk[85]" -type "float3" 1.2484267 -0.11426412 -0.022749912 ;
	setAttr ".tk[86]" -type "float3" 0.43431869 -0.0044592302 -0.030758331 ;
	setAttr ".tk[87]" -type "float3" 0.66481072 0.029824007 -0.041204311 ;
	setAttr ".tk[100]" -type "float3" 0.079684496 0.34536251 0.085248917 ;
	setAttr ".tk[101]" -type "float3" -0.0055948286 0.34536251 0.11427321 ;
	setAttr ".tk[102]" -type "float3" -0.090263404 0.34536251 0.085248917 ;
	setAttr ".tk[103]" -type "float3" -0.1183071 0.34536251 -0.00013134678 ;
	setAttr ".tk[104]" -type "float3" -0.090263404 0.34536251 -0.084698945 ;
	setAttr ".tk[105]" -type "float3" 0.0047270986 0.34536251 -0.11427321 ;
	setAttr ".tk[106]" -type "float3" 0.079684496 0.34536251 -0.084698945 ;
	setAttr ".tk[107]" -type "float3" 0.1183071 0.34536251 -0.0053220717 ;
createNode polyCut -n "polyCut1";
	rename -uid "98BA93D3-428A-243E-E648-71A6852A3792";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 7 "f[1]" "f[6:13]" "f[18:25]" "f[66]" "f[68]" "f[71:81]" "f[101:104]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".pc" -type "double3" 3.86154018 -0.0092609300000000006 -2.8479230100000001 ;
	setAttr ".ro" -type "double3" 34.952332890000001 51.531812890000005 90 ;
createNode polyTweak -n "polyTweak16";
	rename -uid "F83C0037-4FB9-1F82-2894-9EB694C28C9E";
	setAttr ".uopa" yes;
	setAttr -s 34 ".tk";
	setAttr ".tk[8]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[9]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[10]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[11]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[12]" -type "float3" -0.020725965 0.037422284 0.11218659 ;
	setAttr ".tk[13]" -type "float3" -0.03719373 0.025658432 0.10979912 ;
	setAttr ".tk[14]" -type "float3" -0.041682553 0.021686465 0.10911053 ;
	setAttr ".tk[15]" -type "float3" -0.025214665 0.033450302 0.11149795 ;
	setAttr ".tk[20]" -type "float3" -0.00037278002 0.089231253 0.13546674 ;
	setAttr ".tk[21]" -type "float3" -0.0026860074 -0.0032922588 0.15327175 ;
	setAttr ".tk[22]" -type "float3" 0.0084352111 -0.026481148 0.076548062 ;
	setAttr ".tk[23]" -type "float3" 0.010748451 0.066042744 0.058742952 ;
	setAttr ".tk[24]" -type "float3" 0.081533425 0.0081998929 0.11553706 ;
	setAttr ".tk[25]" -type "float3" 0.051831797 -0.013017729 0.11123113 ;
	setAttr ".tk[26]" -type "float3" 0.043735608 -0.020181675 0.10998907 ;
	setAttr ".tk[27]" -type "float3" 0.073437467 0.0010359902 0.11429512 ;
	setAttr ".tk[44]" -type "float3" -0.015385155 -0.0038489089 -0.035326198 ;
	setAttr ".tk[52]" -type "float3" -0.045932151 -8.8817842e-16 -0.018744564 ;
	setAttr ".tk[72]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[73]" -type "float3" -0.0033372226 -3.3306691e-16 0.038144626 ;
	setAttr ".tk[76]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[77]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[79]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[80]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[81]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[82]" -type "float3" 0.031497899 -0.030445252 0.16657244 ;
	setAttr ".tk[83]" -type "float3" 0.046106972 0.092261553 0.14627783 ;
	setAttr ".tk[84]" -type "float3" 0.056644205 0.060777716 0.050994519 ;
	setAttr ".tk[85]" -type "float3" 0.042034931 -0.061929408 0.071289055 ;
	setAttr ".tk[87]" -type "float3" -0.0201474 0.0059207589 0.087488852 ;
	setAttr ".tk[108]" -type "float3" -0.022363577 0.047459807 0.1191965 ;
	setAttr ".tk[109]" -type "float3" -0.023019988 0.038715627 0.099711731 ;
	setAttr ".tk[110]" -type "float3" -0.036084231 0.0069241207 0.10230119 ;
	setAttr ".tk[111]" -type "float3" -0.035427649 0.015668426 0.12178597 ;
createNode polySplitRing -n "polySplitRing4";
	rename -uid "995AF866-4359-8DB9-7497-B3862CA547C7";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 7 "e[6:7]" "e[26]" "e[29]" "e[51]" "e[55]" "e[59]" "e[63]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".wt" 0.30646619200706482;
	setAttr ".re" 55;
	setAttr ".sma" 29.999999999999996;
	setAttr ".p[0]"  0 0 1;
	setAttr ".fq" yes;
createNode polyTweak -n "polyTweak17";
	rename -uid "BD42F773-4DB9-EAF2-6246-E3AB40DA3F42";
	setAttr ".uopa" yes;
	setAttr -s 5 ".tk";
	setAttr ".tk[31]" -type "float3" 0.0085310256 -0.034807108 0.011020172 ;
	setAttr ".tk[112]" -type "float3" -0.018101741 0.026262213 -0.024729077 ;
	setAttr ".tk[113]" -type "float3" -0.018101741 0.026262213 -0.024729077 ;
	setAttr ".tk[114]" -type "float3" -0.018101741 0.026262213 -0.024729077 ;
	setAttr ".tk[115]" -type "float3" -0.018101741 0.026262213 -0.024729077 ;
createNode polyTweak -n "polyTweak18";
	rename -uid "8F02BBAE-450B-BFD5-F72F-65B525EC33CA";
	setAttr ".uopa" yes;
	setAttr -s 17 ".tk";
	setAttr ".tk[3]" -type "float3" -0.026412467 0.066098906 -0.035297051 ;
	setAttr ".tk[4]" -type "float3" 0.03716268 -0.0071220053 0.012778556 ;
	setAttr ".tk[5]" -type "float3" -0.089902401 0.008426467 0.081076838 ;
	setAttr ".tk[31]" -type "float3" -0.018706873 0.041768529 -0.025142148 ;
	setAttr ".tk[34]" -type "float3" 0.097380787 -0.0068653021 0.034480065 ;
	setAttr ".tk[65]" -type "float3" 0 0.057920776 0 ;
	setAttr ".tk[66]" -type "float3" 0 0.057920776 0 ;
	setAttr ".tk[73]" -type "float3" -0.02819279 0.015313196 0.027106036 ;
	setAttr ".tk[74]" -type "float3" -0.021649981 0.064829722 -0.031390771 ;
	setAttr ".tk[75]" -type "float3" -0.0043406505 0.053615548 0.075415559 ;
	setAttr ".tk[77]" -type "float3" -0.064860977 -0.009024228 0.048268806 ;
	setAttr ".tk[78]" -type "float3" -0.065225698 -0.0065310188 0.09894146 ;
	setAttr ".tk[80]" -type "float3" -0.046066456 -0.0084405662 0.054058485 ;
	setAttr ".tk[86]" -type "float3" 0 0 0.073317207 ;
	setAttr ".tk[118]" -type "float3" 0.073564753 -0.023517571 0.024500936 ;
	setAttr ".tk[119]" -type "float3" 0.043777123 -0.014147357 0.014567224 ;
	setAttr ".tk[123]" -type "float3" -0.013556593 0.062234625 -0.017316336 ;
createNode polySplit -n "polySplit13";
	rename -uid "CE184386-4112-7CBE-3E75-EFBBDCF08533";
	setAttr -s 3 ".e[0:2]"  0.666143 0.68654603 0.583049;
	setAttr -s 3 ".d[0:2]"  -2147483567 -2147483530 -2147483534;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak19";
	rename -uid "F9CAD9AF-4020-5199-4997-089878316C5D";
	setAttr ".uopa" yes;
	setAttr -s 3 ".tk[124:126]" -type "float3"  0.021151567 -0.027916089 0.045186572
		 0.033948492 -0.021951498 0.077963993 0.033948492 -0.021951498 0.077963993;
createNode polySplit -n "polySplit14";
	rename -uid "4676C34B-46BD-49C6-1A6D-27937C426E40";
	setAttr -s 4 ".e[0:3]"  1 0.75511903 0.76915902 0.81243497;
	setAttr -s 4 ".d[0:3]"  -2147483567 -2147483569 -2147483639 -2147483467;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak20";
	rename -uid "7F708E2A-4FE9-6A51-6906-5594DE10C971";
	setAttr ".uopa" yes;
	setAttr -s 6 ".tk";
	setAttr ".tk[50]" -type "float3" 0 0.020358209 0 ;
	setAttr ".tk[51]" -type "float3" 0 -0.046798412 0 ;
	setAttr ".tk[64]" -type "float3" 0 -0.047788844 0 ;
	setAttr ".tk[67]" -type "float3" 0 -0.047788844 0 ;
	setAttr ".tk[127]" -type "float3" 0 0.015891239 0 ;
	setAttr ".tk[128]" -type "float3" 0 -0.036094021 0 ;
createNode polySplit -n "polySplit15";
	rename -uid "C9BBC97D-4F5D-2555-9EB0-A68729BC6A60";
	setAttr -s 4 ".e[0:3]"  0.426056 0.452104 0.462432 0.46978599;
	setAttr -s 4 ".d[0:3]"  -2147483555 -2147483556 -2147483515 -2147483516;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak21";
	rename -uid "A8447A6D-44C2-9B43-98E1-78B4A9CB150D";
	setAttr ".uopa" yes;
	setAttr -s 6 ".tk";
	setAttr ".tk[75]" -type "float3" -0.043072745 0.011847011 -0.035504971 ;
	setAttr ".tk[86]" -type "float3" -0.064916633 0.021305569 -0.030476257 ;
	setAttr ".tk[130]" -type "float3" 0 -0.023201836 0 ;
	setAttr ".tk[131]" -type "float3" 0 -0.020750467 0 ;
	setAttr ".tk[132]" -type "float3" 0 0.022958152 0 ;
	setAttr ".tk[133]" -type "float3" 0 0.0094702132 0 ;
createNode polySplit -n "polySplit16";
	rename -uid "8721320D-4B79-9E18-5A58-3F9093BDD3B9";
	setAttr -s 3 ".e[0:2]"  1 0.408241 0.44630799;
	setAttr -s 3 ".d[0:2]"  -2147483555 -2147483590 -2147483469;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak22";
	rename -uid "09BD9812-477D-9A37-3657-14B1E9F9F3EC";
	setAttr ".uopa" yes;
	setAttr -s 20 ".tk";
	setAttr ".tk[3]" -type "float3" -0.060803838 -0.080370463 -0.0061831153 ;
	setAttr ".tk[4]" -type "float3" 0.057114411 -0.020116786 0.021810981 ;
	setAttr ".tk[5]" -type "float3" -0.0073018391 -0.018412506 0.033815414 ;
	setAttr ".tk[31]" -type "float3" -0.066939279 -0.079817496 0.040101588 ;
	setAttr ".tk[34]" -type "float3" 0.016349114 -0.02648335 0.063685879 ;
	setAttr ".tk[37]" -type "float3" 0.036042456 -0.01269484 0.013763976 ;
	setAttr ".tk[40]" -type "float3" -0.02909123 -0.01269934 0.027337911 ;
	setAttr ".tk[55]" -type "float3" -0.031168025 0.0021958076 0.023351209 ;
	setAttr ".tk[60]" -type "float3" 0.010744992 -0.025925724 0.01918795 ;
	setAttr ".tk[63]" -type "float3" 0.025544593 -0.015380867 0.061322991 ;
	setAttr ".tk[100]" -type "float3" 0.11348527 -0.0099574141 0.02695265 ;
	setAttr ".tk[116]" -type "float3" -0.034497172 -0.052511845 -0.049255647 ;
	setAttr ".tk[117]" -type "float3" -0.012700662 -0.036422674 0.039823614 ;
	setAttr ".tk[119]" -type "float3" 0.031813499 8.8817842e-16 0.014031423 ;
	setAttr ".tk[120]" -type "float3" 0.030588204 -0.012872254 0.011328561 ;
	setAttr ".tk[121]" -type "float3" 0 0 -0.079475194 ;
	setAttr ".tk[122]" -type "float3" 0.030303888 -0.0097577553 -0.048185885 ;
	setAttr ".tk[123]" -type "float3" -0.014429005 -0.067937903 -0.024222339 ;
	setAttr ".tk[131]" -type "float3" 0 0 -0.051326767 ;
	setAttr ".tk[134]" -type "float3" 0 -0.042110525 0 ;
createNode polySplit -n "polySplit17";
	rename -uid "09BF71F6-4D97-FC57-AC2E-3BA9181171EA";
	setAttr -s 3 ".e[0:2]"  0.39800999 0.339964 0.63156497;
	setAttr -s 3 ".d[0:2]"  -2147483513 -2147483553 -2147483554;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySplit -n "polySplit18";
	rename -uid "FEB50266-4C66-CB3A-A9D6-89968B76419C";
	setAttr -s 2 ".e[0:1]"  0 0.38260299;
	setAttr -s 2 ".d[0:1]"  -2147483387 -2147483514;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polyTweak -n "polyTweak23";
	rename -uid "49AC9180-4B76-9155-6133-C49B5EB41BE6";
	setAttr ".uopa" yes;
	setAttr -s 9 ".tk";
	setAttr ".tk[63]" -type "float3" 0.00052484678 0.0078368308 -0.036161378 ;
	setAttr ".tk[69]" -type "float3" 0 -0.021191237 0 ;
	setAttr ".tk[70]" -type "float3" 0 -0.021191237 0 ;
	setAttr ".tk[73]" -type "float3" 0.13486525 0.038094055 -0.069882691 ;
	setAttr ".tk[78]" -type "float3" 0.11879574 0.013665279 -0.032598738 ;
	setAttr ".tk[136]" -type "float3" 0 0.034694243 0 ;
	setAttr ".tk[137]" -type "float3" -0.00017089728 -0.018077193 -0.0042615645 ;
	setAttr ".tk[138]" -type "float3" 0 -0.015933935 0 ;
	setAttr ".tk[139]" -type "float3" 0 -0.014437961 0 ;
createNode polySplit -n "polySplit19";
	rename -uid "598EB6E5-4084-7DA3-901C-D68D3EACCF9B";
	setAttr -s 9 ".e[0:8]"  0.46665201 0.48677099 0.446064 0.51600498
		 0.45640999 0.535173 0.47932601 0.495015 0.46665201;
	setAttr -s 9 ".d[0:8]"  -2147483511 -2147483635 -2147483483 -2147483633 -2147483494 -2147483638 
		-2147483498 -2147483637 -2147483511;
	setAttr ".sma" 180;
	setAttr ".m2015" yes;
createNode polySmoothFace -n "polySmoothFace1";
	rename -uid "B4A5C99F-4CDC-2086-863D-A28A113411E4";
	setAttr ".ics" -type "componentList" 1 "f[*]";
	setAttr ".suv" yes;
	setAttr ".ps" 0.10000000149011612;
	setAttr ".ro" 1;
	setAttr ".ma" yes;
	setAttr ".m08" yes;
createNode polyTweak -n "polyTweak24";
	rename -uid "A8AFCD74-467E-45ED-E870-6E87ED25E542";
	setAttr ".uopa" yes;
	setAttr -s 107 ".tk";
	setAttr ".tk[1]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[2]" -type "float3" -0.063040204 0.013251593 -0.048471093 ;
	setAttr ".tk[3]" -type "float3" -0.029840086 -0.00051182113 -0.02154677 ;
	setAttr ".tk[4]" -type "float3" -0.12211873 0.084496826 -0.086129554 ;
	setAttr ".tk[6]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[7]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[8]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[9]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[10]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[11]" -type "float3" -0.1728352 0.087405592 -0.043915324 ;
	setAttr ".tk[12]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[13]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[14]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[15]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[17]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[18]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[19]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[20]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[21]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[22]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[23]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[24]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[25]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[26]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[27]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[28]" -type "float3" -0.076870941 -0.0043952842 -0.058681659 ;
	setAttr ".tk[29]" -type "float3" 0.0018684111 0 0 ;
	setAttr ".tk[31]" -type "float3" -0.076870941 -0.0043952842 -0.058681659 ;
	setAttr ".tk[32]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[33]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[34]" -type "float3" -0.063040204 0.013251593 -0.048471093 ;
	setAttr ".tk[37]" -type "float3" -0.08141268 0.058184352 -0.062982738 ;
	setAttr ".tk[38]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[39]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[42]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[43]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[44]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[47]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[48]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[49]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[50]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[51]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[52]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[53]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[56]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[59]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[60]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[63]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[64]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[65]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[66]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[67]" -type "float3" -0.049658477 -0.0019843469 0.054822847 ;
	setAttr ".tk[69]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[70]" -type "float3" -0.056644559 0.0069021182 0.056221724 ;
	setAttr ".tk[72]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[73]" -type "float3" -0.20105737 0.053495146 -0.07037922 ;
	setAttr ".tk[74]" -type "float3" -0.20105737 0.053495146 -0.07037922 ;
	setAttr ".tk[75]" -type "float3" -0.11196178 0.044515155 -0.0020753429 ;
	setAttr ".tk[76]" -type "float3" -0.17955622 0.072664529 -0.062480442 ;
	setAttr ".tk[77]" -type "float3" -0.20673206 0.09782505 -0.07563179 ;
	setAttr ".tk[78]" -type "float3" -0.20105737 0.053495146 -0.07037922 ;
	setAttr ".tk[79]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[80]" -type "float3" -0.17614245 0.07890828 -0.057977967 ;
	setAttr ".tk[81]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[82]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[83]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[84]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[85]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[86]" -type "float3" -0.11196178 0.044515155 -0.0020753429 ;
	setAttr ".tk[87]" -type "float3" -0.18838005 0.094506785 -0.053647887 ;
	setAttr ".tk[88]" -type "float3" 0.0018684111 0 0 ;
	setAttr ".tk[89]" -type "float3" 0.0018684111 0 0 ;
	setAttr ".tk[90]" -type "float3" 0.0018684111 0 0 ;
	setAttr ".tk[91]" -type "float3" 0.0018684111 0 0 ;
	setAttr ".tk[92]" -type "float3" -0.064400613 0 -0.077951469 ;
	setAttr ".tk[95]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[96]" -type "float3" -0.065766767 0.0466966 -0.072879352 ;
	setAttr ".tk[100]" -type "float3" -0.13988397 0.12786859 0.039946929 ;
	setAttr ".tk[101]" -type "float3" -0.08141268 0.058184352 0.098400623 ;
	setAttr ".tk[108]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[109]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[110]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[111]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[112]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[113]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[114]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[115]" -type "float3" -0.11446845 0.086924188 -0.047084764 ;
	setAttr ".tk[118]" -type "float3" 0 0.022387533 0 ;
	setAttr ".tk[119]" -type "float3" -0.11340173 0.065743476 -0.085149035 ;
	setAttr ".tk[120]" -type "float3" -0.08141268 0.058184352 -0.062982738 ;
	setAttr ".tk[124]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[125]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[126]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[127]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[128]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[129]" -type "float3" -0.09992633 0 0 ;
	setAttr ".tk[136]" -type "float3" -0.071914285 -4.4408921e-16 -0.040124029 ;
	setAttr ".tk[137]" -type "float3" -0.071914285 -4.4408921e-16 -0.040124029 ;
	setAttr ".tk[138]" -type "float3" -0.071914285 -4.4408921e-16 -0.040124029 ;
	setAttr ".tk[139]" -type "float3" -0.071914285 -4.4408921e-16 -0.040124029 ;
	setAttr ".tk[140]" -type "float3" -0.091728747 2.4980018e-16 -0.070131928 ;
	setAttr ".tk[142]" -type "float3" -0.115644 0.066538617 -0.089788355 ;
	setAttr ".tk[143]" -type "float3" -0.12818973 0.07021261 -0.098266706 ;
	setAttr ".tk[144]" -type "float3" -0.115644 0.066538617 -0.089788355 ;
	setAttr ".tk[145]" -type "float3" -0.115644 0.066538617 -0.089788355 ;
	setAttr ".tk[146]" -type "float3" -0.091728747 2.4980018e-16 -0.070131928 ;
	setAttr ".tk[147]" -type "float3" -0.091728747 2.4980018e-16 -0.070131928 ;
createNode polyMapCut -n "polyMapCut1";
	rename -uid "50B6BA4B-4BF4-E65E-20A7-58A4D945739E";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 8 "e[649]" "e[651]" "e[653]" "e[655]" "e[657]" "e[659]" "e[661]" "e[663]";
createNode polyPlanarProj -n "polyPlanarProj1";
	rename -uid "A79DEFD7-47CF-8D47-1942-3F8453EE2AA9";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 1 "f[0:567]";
	setAttr ".ix" -type "matrix" 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1;
	setAttr ".ws" yes;
	setAttr ".pc" -type "double3" 0.096379712224006653 0.18906833231449127 -0.11504341661930084 ;
	setAttr ".ro" -type "double3" -18.338352435694535 -62.599999835696678 -9.5574625206716302e-07 ;
	setAttr ".ps" -type "double2" 1.4594058281044302 1.8566921608537055 ;
	setAttr ".per" yes;
	setAttr ".cam" -type "matrix" 0.89483290910720825 0.85607701539993286 0.84274458885192871 0.84272778034210205
		 3.3960416209066784e-17 2.9090926647186279 -0.31463420391082764 -0.31462791562080383
		 1.72630774974823 -0.44374817609786987 -0.43683731555938721 -0.43682858347892761 -1.0596902370452881 0.58646553754806519 5.21759033203125 5.4174838066101074;
	setAttr ".prgt" 1097;
	setAttr ".ptop" 696;
createNode polyMapCut -n "polyMapCut2";
	rename -uid "332177C2-42D4-2C59-1D23-80AA7D1CDAFB";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 8 "e[649]" "e[651]" "e[653]" "e[655]" "e[657]" "e[659]" "e[661]" "e[663]";
createNode polyMapCut -n "polyMapCut3";
	rename -uid "0B586565-4E27-F1B9-4B24-B6B2341EEE4C";
	setAttr ".uopa" yes;
	setAttr ".ics" -type "componentList" 16 "e[779]" "e[782]" "e[788]" "e[790]" "e[796]" "e[799]" "e[805]" "e[807]" "e[813]" "e[815]" "e[821]" "e[823]" "e[829]" "e[832]" "e[838]" "e[841]";
createNode polyTweakUV -n "polyTweakUV1";
	rename -uid "063B1E3B-4BC7-8B40-E59F-59B618C4C8C4";
	setAttr ".uopa" yes;
	setAttr -s 594 ".uvtk";
	setAttr ".uvtk[0:249]" -type "float2" -0.10696264 -0.0096059814 -0.10237284
		 -0.0051609948 -0.098078981 -0.01487086 -0.10037495 -0.025726713 -0.082322016 -0.032188781
		 -0.083449081 -0.040869959 -0.083477929 -0.051308498 -0.10041697 -0.0368791 -0.10746165
		 -0.021265157 0.050220687 -0.098643005 0.048445124 -0.090328209 0.052908618 -0.088864081
		 0.055781025 -0.0982306 0.059952155 -0.088000111 0.063393489 -0.095885567 0.066864178
		 -0.10264874 0.060804144 -0.10570938 0.055350561 -0.10512967 0.19559343 -0.033216722
		 0.16716498 -0.049240395 0.16526514 -0.039458938 0.19390203 -0.023085184 0.16236863
		 -0.031583436 0.19050135 -0.014999904 0.20851684 0.0059890673 0.21395113 -0.0026393309
		 0.21564443 -0.013210006 0.10245755 -0.081480384 0.10018077 -0.079205155 0.0753479
		 -0.0867569 0.04212901 -0.083081692 0.056711197 -0.085576683 0.03223598 -0.089002088
		 0.0066664536 -0.083238393 -0.0063797496 -0.084622324 -0.025193598 -0.072933972 -0.017467108
		 -0.070452541 -0.017941084 -0.052817643 0.007375123 -0.055359036 0.026935907 -0.03988675
		 0.054598331 -0.050210223 0.085064054 -0.044238992 0.096907526 -0.06463635 0.11802018
		 -0.065623462 0.0048297066 -0.05808115 0.0060502011 -0.051992998 0.033743858 -0.0544554
		 0.033151567 -0.059322864 0.064727575 -0.054843724 0.065088242 -0.059188128 0.065090895
		 -0.064804494 0.03203994 -0.065489352 0.0029462595 -0.065779507 0.12660995 0.043988593
		 0.12287426 0.050595459 0.066230416 0.051688965 0.069167942 0.043986715 0.0056593437
		 0.046093546 0.0056643207 0.038487941 0.0059750993 0.027822115 0.071460575 0.033466041
		 0.13047585 0.033631898 0.028917592 -0.052235924 0.013371121 -0.045545124 0.016931307
		 -0.07994201 0.028542917 -0.086810015 0.017595958 -0.10286512 0.023386341 -0.1169249
		 0.032275539 -0.12450012 0.041572731 -0.094497882 0.047431391 -0.060744725 0.018849116
		 -0.042353891 0.028989326 -0.044244967 0.024584781 -0.075637065 0.016387712 -0.074210726
		 0.019483309 -0.096906386 0.012173664 -0.10518887 0.0081834309 -0.10585722 0.0099224858
		 -0.074377321 0.0095380954 -0.042207621 0.051727038 -0.058249556 0.066503473 -0.062970482
		 0.056026798 -0.091213308 0.0448444 -0.086395822 0.047365677 -0.11045232 0.037141364
		 -0.11496266 0.027337383 -0.11061331 0.034896385 -0.082641862 0.039485615 -0.054278336
		 0.082920022 -0.078083716 0.072800882 -0.07475742 0.060225796 -0.10466763 0.067131229
		 -0.10628971 0.050046455 -0.12186404 0.049063038 -0.12971804 0.050346266 -0.12866548
		 0.069699623 -0.10448702 0.086781897 -0.077154778 0.011975568 -0.10858312 0.011861395
		 -0.13309202 0.005048763 -0.12850687 -0.0036804862 -0.14621702 0.00062362477 -0.15147665
		 0.0072575621 -0.15914682 0.020914268 -0.14349166 0.020857852 -0.10713347 0.00946353
		 -0.12632003 0.017373245 -0.13249734 0.0048974864 -0.15043792 -0.0009134002 -0.14584854
		 0.04811288 -0.12312009 0.028990161 -0.13799754 0.031678896 -0.14633748 0.0147507
		 -0.1622 0.011776131 -0.15641102 0.040852111 -0.12798813 0.030991655 -0.14597711 0.013293605
		 -0.1624209 0.098723777 0.066632286 0.10382385 0.090402082 0.067864127 0.095012948
		 0.068259366 0.07163848 0.029647063 0.094756678 0.035754394 0.072702661 0.039600533
		 0.053014055 0.06760595 0.05119212 0.093934588 0.046362206 0.1094823 0.028532043 0.088825785
		 0.028365746 0.094008125 0.042516604 0.11650077 0.044731513 0.10378411 0.056695119
		 0.12819999 0.061954483 0.14100194 0.069634691 0.12910774 0.048968002 0.12078063 0.030653641
		 0.010721188 0.041693315 0.00035808608 0.054028407 0.024712037 0.052012995 0.029057186
		 0.039563641 0.050444108 0.051533297 0.048363965 0.038822576 0.046393525 0.02661521
		 0.031957787 0.028152652 0.018839072 0.030803278 -0.015237972 0.064776167 -0.030440196
		 0.082880601 -0.041069984 0.072300032 -0.025014445 0.056779668 -0.037987947 0.062611714
		 -0.022813901 0.049195245 -0.010138467 0.037491694 -0.012381449 0.043646351 -0.0041796155
		 0.049613163 -0.018468246 -0.17201528 -0.019739136 -0.16761157 -0.023312166 -0.16998681
		 0.074683562 -0.077090546 0.070691958 -0.071693294 0.072109357 -0.07848154 0.076904789
		 -0.084644958 0.078241184 -0.081658289 -0.01507102 -0.17627582 -0.017306104 -0.16600552
		 -0.013364777 -0.16723892 -0.015902117 -0.16856822 0.076573685 -0.069756202 0.080676332
		 -0.069789402 0.074675575 -0.068602316 -0.01005806 -0.17137489 -0.0088306218 -0.17568681
		 -0.011282578 -0.17810652 0.084564939 -0.075156137 0.086892381 -0.082623705 0.085424319
		 -0.075865194 -0.011171177 -0.17741325 0.082731977 -0.082517073 0.082961693 -0.085792594
		 0.061170116 -0.085165426 0.058539171 -0.072098307 0.050419349 -0.07346379 0.053582925
		 -0.089585178 0.044655401 -0.077019498 0.047880549 -0.093789808 0.059631307 -0.10904928
		 0.0649205 -0.10427029 0.070381746 -0.097059309 0.066258058 -0.066195644 0.077727869
		 -0.0684691 0.074100986 -0.068988197 0.059991792 -0.06620089 0.069325045 -0.072308056
		 0.05465408 -0.069443099 0.0867659 -0.080041036 0.089583889 -0.09299802 0.088624671
		 -0.099139273 0.0851769 -0.083185658 0.084328011 -0.10363025 0.080795184 -0.087041788
		 0.082058623 -0.099187076 0.079344407 -0.10683585 0.07464312 -0.11167391 -0.0051078387
		 0.090554163 0.0063914768 0.070262 0.014336359 0.052630022 -0.045052521 0.03422977
		 -0.080917671 0.019805863 -0.083931938 0.014209814 -0.046934303 0.027230285 -0.085462347
		 0.0042596981 -0.047940668 0.017071582 -0.022227719 0.057069227 -0.0086296946 0.044553772
		 0.0026125722 0.033579245 -0.055668168 -0.042563029 -0.029069301 -0.048018932 -0.030832406
		 -0.055779308 -0.056928452 -0.050562516 -0.032254394 -0.066239059 -0.05758464 -0.061092257
		 0.06657768 0.027201392 0.070654936 0.040176168 0.077300332 0.053170726 0.12157021
		 -0.050694361 0.12339814 -0.059400141 0.0960325 -0.06249994 0.09496215 -0.055568784
		 0.093172997 -0.050139666 0.11864533 -0.043758757 0.13092041 0.080418155 0.12137806
		 0.057569012 0.11384878 0.037959561 0.18375131 0.02957233 0.18042767 0.033650853 0.16149545
		 0.042947322 0.16103742 0.039185539 0.16495104 0.028360747 0.18690906 0.018301927
		 -0.080473021 -0.0084013119 -0.071856737 -0.029260196 -0.07900238 -0.028435685 -0.091123357
		 -0.0052233413 -0.098835185 0.0060496032 -0.07665211 0.01728595 -0.069297135 0.014463678
		 -0.092517272 -0.04670912 -0.082510903 -0.046732113 -0.078475952 -0.037033655 -0.089626148
		 -0.033691265 -0.065749586 -0.021770038;
	setAttr ".uvtk[250:499]" -0.073761702 -0.020165451 -0.081861749 -0.01491449
		 -0.099931493 -0.028806217 -0.10373123 -0.042350896 0.17447744 -0.046401724 0.15007642
		 -0.062063307 0.15780784 -0.063817412 0.18119726 -0.047919035 0.1642603 -0.062427044
		 0.1889648 -0.046303496 0.2047105 -0.027998157 0.19586509 -0.029848434 0.1878864 -0.028091289
		 0.18055417 -0.013822265 0.19384107 0.0068991557 0.2009252 0.0091023371 0.18708105
		 -0.013107337 0.15941952 -0.0292565 0.15389632 -0.029083617 0.0067914743 -0.047521666
		 0.0082076807 -0.044144399 0.034213275 -0.047746763 0.033875674 -0.050741091 0.063397229
		 -0.049770445 0.064209938 -0.0519941 0.0034245867 -0.083330482 0.01000035 -0.081609845
		 -0.0014522932 -0.083209962 -0.012896027 -0.086899117 -0.021001007 -0.083157539 -0.027275469
		 -0.086874858 -0.0318042 -0.085096449 -0.017354216 -0.08539924 -0.00057747588 -0.082213789
		 0.063951284 0.048090011 0.0085782129 0.042924836 0.0064333398 0.04682783 0.064911127
		 0.052439839 0.12476151 0.048606217 0.12071872 0.043980286 0.065316588 0.0082334206
		 0.11525364 0.0089596882 0.11842255 0.011724621 0.066754431 0.01070869 0.12400892
		 0.017209172 0.068682939 0.016913474 0.0069279987 0.0098578483 0.0092829186 0.0035896972
		 0.011546912 0.001500003 -0.038007434 0.031698756 -0.042723291 0.034922466 -0.034202393
		 -0.0087405816 -0.039477285 -0.00728295 -0.045086615 -0.0014621988 -0.048689123 -0.039922841
		 -0.02366465 -0.043904819 -0.027273919 -0.045221098 -0.053667184 -0.040338613 -0.044489913
		 -0.07688728 -0.065578878 -0.066587865 -0.073341131 -0.068820983 -0.050171372 -0.079696238
		 -0.080950156 -0.066494316 -0.055846684 -0.077764601 0.1137346 -0.075333387 0.10998538
		 -0.073209882 0.091830879 -0.07305783 0.089642048 -0.076139182 0.062189341 -0.07458657
		 0.062692344 -0.076776952 0.063652098 -0.076395839 0.092812806 -0.075647235 0.11851905
		 -0.074531585 0.1166798 -0.040217645 0.11334562 -0.038679667 0.13326237 -0.035219021
		 0.13774395 -0.036161877 0.1402425 -0.039239533 0.16991025 0.028390832 0.17629093
		 0.033230461 0.19629648 0.025284141 0.16986054 -0.0062074438 0.16517884 -0.0061868206
		 0.17766616 -0.013203897 0.18895073 -0.016737916 0.19752297 -0.014667787 0.17751762
		 -0.0035522953 -0.072148025 0.11586242 -0.063208342 0.13556182 -0.068419039 0.13841227
		 -0.072137177 -0.041722424 -0.076939285 -0.054636776 -0.062648237 -0.059141159 -0.064503342
		 0.099013999 -0.10754819 -0.033009984 -0.10043938 -0.047131851 -0.083482221 -0.06025219
		 -0.097164944 -0.054788798 0.16216296 0.1121661 0.13289517 0.098240867 0.137582 0.1002263
		 0.17275645 -0.04214064 0.18320285 -0.023195751 0.17334065 0.12911418 0.21193951 -0.022059716
		 0.19385637 -0.041181214 0.16710205 -0.057232171 0.016844284 0.083543554 -0.017579064
		 0.085915253 -0.020582095 0.083341494 0.019352855 -0.075722873 0.029958755 -0.077634692
		 0.062698066 -0.071845621 0.056246649 0.084493026 -0.015421715 -0.066889912 0.00021258369
		 -0.07508409 -0.017440286 -0.077438593 -0.033015247 -0.077107608 0.059962701 0.16352332
		 0.1107307 0.16050595 0.11164489 0.16773835 0.064662188 0.011762261 0.012156637 0.0056924373
		 0.0093796961 0.15875468 0.0061077196 0.018098719 0.070779264 0.024462618 0.12882751
		 0.024599329 -0.034077227 0.14970279 -0.032560106 -0.0042537227 -0.085274771 -0.0061176494
		 -0.047623333 0.0070720464 -0.045389712 0.090133145 -0.042653434 -0.06961596 -0.05776554
		 -0.070858926 0.096259154 0.088977382 0.105827 -0.06784305 0.12490012 -0.070307463
		 0.12206075 -0.068271399 0.095128447 -0.070138335 0.064531446 -0.071467787 0.15311375
		 0.14694706 0.16177189 -0.0041664615 0.14898425 0.0015531555 0.18402638 0.0059279427
		 0.16267085 0.017381683 0.15670647 0.0086891502 0.033884894 -0.048924826 0.029449146
		 -0.078759216 0.01217733 0.0019770935 0.023658823 -0.00038775057 0.027296554 -0.019908331
		 0.01649807 -0.017744683 0.0063733868 -0.016880058 0.0018321089 0.003800489 0.032985281
		 -0.024808489 0.030894589 -0.0047259554 0.041155171 -0.010075592 0.040675115 -0.03071966
		 0.076811664 -0.041170679 0.084473036 -0.020238124 0.1004099 -0.023192607 0.091674276
		 -0.046822451 0.10706251 -0.022884272 0.098642044 -0.050120018 0.079677232 -0.070643388
		 0.10152001 -0.017629825 0.087260328 -0.011119626 0.081578858 -0.042958818 0.093851201
		 -0.04800155 0.022372883 0.0024318472 0.0041337125 0.0072233155 0.0086501054 -0.017127536
		 0.026250552 -0.023433171 0.048373174 -0.0315217 0.046325814 -0.0038880929 -0.0017385967
		 0.0065705255 0.0029347651 -0.015841745 0.0073364489 -0.042754315 0.010411303 -0.076048099
		 0.06844271 -0.0074663386 0.066671856 -0.037763976 0.061566245 -0.068649791 0.051955711
		 -0.10062047 0.044700164 -0.084054634 0.047178049 -0.09699291 0.05619641 -0.1087146
		 0.067762002 -0.11073513 0.075296476 -0.10454053 0.07263495 -0.091710977 0.063782737
		 -0.080301985 0.052420635 -0.0781378 0.061805021 -0.015541218 0.057513338 -0.035986982
		 0.065123335 -0.098321699 -0.087294236 -0.058105588 -0.10380389 -0.0080310479 -0.10378499
		 -0.019412316 -0.10263528 0.0028459951 0.14322682 -0.027677692 0.16782562 -0.013578989
		 0.12953342 -0.034541227 0.15167093 -0.022960551 0.16174635 -0.008004941 0.17988609
		 0.004759416 0.10625222 -0.037751414 0.12423033 -0.033996858 0.10014611 -0.040260382
		 0.11021599 -0.040336557 0.011492969 -0.041322865 0.035436809 -0.045025833 0.017131748
		 -0.043307878 0.034056067 -0.048745587 0.060905874 -0.051494047 0.062142521 -0.047292858
		 -0.058660444 -0.028237589 -0.038418349 -0.037339367 -0.045566138 -0.034324862 -0.028103109
		 -0.042155005 -0.0076910518 -0.044906683 -0.016386356 -0.040563144 -0.056728892 0.011399895
		 -0.065627158 -0.0097596422 -0.043113165 -0.00033450872 -0.051254388 -0.01841379 0.012628676
		 0.036643386 -0.02907249 0.026941501 0.017355444 0.020695657 -0.018894579 0.012792028
		 0.11296576 0.036454856 0.062147707 0.040560931 0.10416496 0.019160405 0.060374558
		 0.023310281 0.15760957 0.022856049 0.14239098 0.0073013753 0.11482307 -0.05973506
		 0.13458091 -0.053163201 0.14166528 -0.042520858 0.084125221 -0.047363847 0.090854764
		 -0.06229353 0.060162365 -0.069771856 0.0076979715 -0.045155235 0.026395412 -0.065435171
		 5.9939921e-06 -0.067040712 -0.038828131 -0.05674395 -0.023202565 -0.064305216 -0.032337304
		 -0.029303201 -0.041902002 -0.043663509 0.021694126 -0.012345172 -0.010158088 -0.018726952
		 0.096563786 -0.015046872;
	setAttr ".uvtk[500:593]" 0.059410304 -0.01042641 0.1267391 -0.027870126 0.074333116
		 -0.090144746 0.083002642 -0.091759853 0.088608697 -0.087196998 0.086508349 -0.077547535
		 0.079750016 -0.068898432 0.071195081 -0.067202903 0.06548132 -0.071606748 0.067478105
		 -0.081317112 -0.012568966 -0.15946075 -0.010164633 -0.16429326 -0.0055824108 -0.16975543
		 -0.0058838278 -0.16159722 -0.010325089 -0.1588892 0.00055370852 -0.17116854 -0.0016150065
		 -0.16666266 -0.0013760217 -0.17213175 -0.0098596364 0.072543815 0.020611148 0.070148483
		 0.053620826 0.069949374 0.11926653 0.079620585 0.087334402 0.073148862 0.14641544
		 0.08940126 0.15851974 0.10190405 0.10796546 0.12806144 0.14313543 0.11628302 0.064074531
		 0.1319139 0.019074123 0.1294075 -0.048447162 0.11169591 -0.020713046 0.12268194 -0.058299422
		 0.096596584 -0.053120285 0.083121195 -0.035572231 0.076042041 0.030348361 -0.073099852
		 0.029617937 -0.0788894 0.031415373 -0.079555184 -0.011836614 -0.050477654 -0.013515737
		 -0.057566971 -0.008019533 -0.044064976 -0.010495152 -0.046622813 -0.0028778575 -0.040844418
		 0.1452764 -0.05635348 0.14325844 -0.046865821 0.14476363 -0.065004617 0.14168748
		 -0.070878178 0.13600233 -0.071993768 0.08983627 -0.045166351 0.091911972 -0.047016844
		 0.085567057 -0.043548323 0.20867328 0.0042328909 0.20491931 -0.0067232922 0.20637101
		 0.015303999 0.1496364 0.0046524927 0.022029262 0.016585983 0.031577211 0.013092585
		 0.043521833 0.009616144 0.087041937 0.0052051917 0.064211532 0.0070507601 0.10521867
		 0.0039089695 0.11392819 0.0053487495 0.090744071 0.019524284 0.10770207 0.011930473
		 0.068209209 0.023481138 0.04326589 0.025858469 0.0010885112 0.029889002 0.019045215
		 0.02885367 -0.0057056099 0.026600786 -0.0027657337 0.022094317 0.008584898 0.019183643
		 -0.014203653 -0.18044856 0.085653022 -0.080175027 -0.018694416 -0.17958984 -0.012370661
		 -0.17308757 0.081033483 -0.070636682 -0.020361915 -0.16768774 0.073623434 -0.072055273
		 -0.022252038 -0.17502198 0.15586472 0.15391955 0.11755204 0.0096523538 0.17729571
		 0.13489026 0.099919833 0.090242937 0.14348912 -0.057859689 0.056790929 0.086240366
		 -0.04856059 0.088469997 -0.014674928 -0.074744493 -0.068555295 0.098944798 -0.038467228
		 0.15383229 -0.062511981 -0.019673713 0.0062494688 0.16377845 0.058755051 0.16984826
		 0.013445687 0.082363084 0.16684929 0.11594536 -0.078044295 0.11636358;
createNode file -n "file1";
	rename -uid "54E867A4-4748-4723-93D0-0CB43454B446";
	setAttr ".ftn" -type "string" "D:/模型/每日一做/圣诞帽/tt.jpg";
	setAttr ".cs" -type "string" "sRGB";
createNode place2dTexture -n "place2dTexture1";
	rename -uid "247B1276-434D-F0CD-3655-BDB8BC5970E2";
createNode script -n "uiConfigurationScriptNode";
	rename -uid "FF1DBF65-4476-BFC5-7191-4BB51D0D3679";
	setAttr ".b" -type "string" (
		"// Maya Mel UI Configuration File.\n//\n//  This script is machine generated.  Edit at your own risk.\n//\n//\n\nglobal string $gMainPane;\nif (`paneLayout -exists $gMainPane`) {\n\n\tglobal int $gUseScenePanelConfig;\n\tint    $useSceneConfig = $gUseScenePanelConfig;\n\tint    $menusOkayInPanels = `optionVar -q allowMenusInPanels`;\tint    $nVisPanes = `paneLayout -q -nvp $gMainPane`;\n\tint    $nPanes = 0;\n\tstring $editorName;\n\tstring $panelName;\n\tstring $itemFilterName;\n\tstring $panelConfig;\n\n\t//\n\t//  get current state of the UI\n\t//\n\tsceneUIReplacement -update $gMainPane;\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Top View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"top\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n"
		+ "            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 16384\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n"
		+ "            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n"
		+ "            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Side View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"side\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 16384\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n"
		+ "            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n"
		+ "            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Front View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"front\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n"
		+ "            -textureDisplay \"modulate\" \n            -textureMaxSize 16384\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n"
		+ "            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n"
		+ "            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Persp View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"persp\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n"
		+ "            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 1\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 16384\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n"
		+ "            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n"
		+ "            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1097\n            -height 696\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -docTag \"isolOutln_fromSeln\" \n            -showShapes 0\n            -showAssignedMaterials 0\n            -showTimeEditor 1\n            -showReferenceNodes 0\n            -showReferenceMembers 0\n"
		+ "            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n            -organizeByLayer 1\n            -organizeByClip 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showParentContainers 0\n            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUpstreamCurves 1\n            -showUnitlessCurves 1\n            -showCompounds 1\n            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n"
		+ "            -isSet 0\n            -isSetMember 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n            -niceNames 1\n            -showNamespace 1\n            -showPinIcons 0\n            -mapMotionTrails 0\n            -ignoreHiddenAttribute 0\n            -ignoreOutlinerColor 0\n            -renderFilterVisible 0\n            -renderFilterIndex 0\n            -selectionOrder \"chronological\" \n            -expandAttribute 0\n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"Outliner\")) `;\n\tif (\"\" != $panelName) {\n"
		+ "\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"Outliner\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -docTag \"isolOutln_fromSeln\" \n            -showShapes 0\n            -showAssignedMaterials 0\n            -showTimeEditor 1\n            -showReferenceNodes 0\n            -showReferenceMembers 0\n            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n            -organizeByLayer 1\n            -organizeByClip 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showParentContainers 0\n            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUpstreamCurves 1\n            -showUnitlessCurves 1\n            -showCompounds 1\n"
		+ "            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n            -niceNames 1\n            -showNamespace 1\n            -showPinIcons 0\n            -mapMotionTrails 0\n            -ignoreHiddenAttribute 0\n            -ignoreOutlinerColor 0\n            -renderFilterVisible 0\n"
		+ "            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"graphEditor\" (localizedPanelLabel(\"Graph Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Graph Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAssignedMaterials 0\n                -showTimeEditor 1\n                -showReferenceNodes 0\n                -showReferenceMembers 0\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -organizeByClip 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 1\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n"
		+ "                -showPublishedAsConnected 0\n                -showParentContainers 1\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUpstreamCurves 1\n                -showUnitlessCurves 1\n                -showCompounds 0\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 1\n                -doNotSelectNewObjects 0\n                -dropIsParent 1\n                -transmitFilters 1\n                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n"
		+ "                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                -showPinIcons 1\n                -mapMotionTrails 1\n                -ignoreHiddenAttribute 0\n                -ignoreOutlinerColor 0\n                -renderFilterVisible 0\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"GraphEd\");\n            animCurveEditor -e \n                -displayKeys 1\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 1\n                -displayInfinities 0\n                -displayValues 0\n                -autoFit 1\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -showResults \"off\" \n                -showBufferCurves \"off\" \n                -smoothness \"fine\" \n                -resultSamples 1\n                -resultScreenSamples 0\n                -resultUpdate \"delayed\" \n"
		+ "                -showUpstreamCurves 1\n                -showCurveNames 0\n                -showActiveCurveNames 0\n                -stackedCurves 0\n                -stackedCurvesMin -1\n                -stackedCurvesMax 1\n                -stackedCurvesSpace 0.2\n                -displayNormalized 0\n                -preSelectionHighlight 0\n                -constrainDrag 0\n                -classicMode 1\n                -valueLinesToggle 0\n                -outliner \"graphEditor1OutlineEd\" \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dopeSheetPanel\" (localizedPanelLabel(\"Dope Sheet\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dope Sheet\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAssignedMaterials 0\n                -showTimeEditor 1\n"
		+ "                -showReferenceNodes 0\n                -showReferenceMembers 0\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -organizeByClip 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 0\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showParentContainers 1\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUpstreamCurves 1\n                -showUnitlessCurves 0\n                -showCompounds 1\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 0\n                -doNotSelectNewObjects 1\n                -dropIsParent 1\n                -transmitFilters 0\n"
		+ "                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                -showPinIcons 0\n                -mapMotionTrails 1\n                -ignoreHiddenAttribute 0\n                -ignoreOutlinerColor 0\n                -renderFilterVisible 0\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"DopeSheetEd\");\n            dopeSheetEditor -e \n                -displayKeys 1\n"
		+ "                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -displayValues 0\n                -autoFit 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -outliner \"dopeSheetPanel1OutlineEd\" \n                -showSummary 1\n                -showScene 0\n                -hierarchyBelow 0\n                -showTicks 1\n                -selectionWindow 0 0 0 0 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"timeEditorPanel\" (localizedPanelLabel(\"Time Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Time Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"clipEditorPanel\" (localizedPanelLabel(\"Trax Editor\")) `;\n"
		+ "\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Trax Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = clipEditorNameFromPanel($panelName);\n            clipEditor -e \n                -displayKeys 0\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -displayValues 0\n                -autoFit 0\n                -snapTime \"none\" \n                -snapValue \"none\" \n                -initialized 0\n                -manageSequencer 0 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"sequenceEditorPanel\" (localizedPanelLabel(\"Camera Sequencer\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Camera Sequencer\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = sequenceEditorNameFromPanel($panelName);\n"
		+ "            clipEditor -e \n                -displayKeys 0\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -displayValues 0\n                -autoFit 0\n                -snapTime \"none\" \n                -snapValue \"none\" \n                -initialized 0\n                -manageSequencer 1 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperGraphPanel\" (localizedPanelLabel(\"Hypergraph Hierarchy\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypergraph Hierarchy\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"HyperGraphEd\");\n            hyperGraph -e \n                -graphLayoutStyle \"hierarchicalLayout\" \n                -orientation \"horiz\" \n                -mergeConnections 0\n                -zoom 1\n"
		+ "                -animateTransition 0\n                -showRelationships 1\n                -showShapes 0\n                -showDeformers 0\n                -showExpressions 0\n                -showConstraints 0\n                -showConnectionFromSelected 0\n                -showConnectionToSelected 0\n                -showConstraintLabels 0\n                -showUnderworld 0\n                -showInvisible 0\n                -transitionFrames 1\n                -opaqueContainers 0\n                -freeform 0\n                -imagePosition 0 0 \n                -imageScale 1\n                -imageEnabled 0\n                -graphType \"DAG\" \n                -heatMapDisplay 0\n                -updateSelection 1\n                -updateNodeAdded 1\n                -useDrawOverrideColor 0\n                -limitGraphTraversal -1\n                -range 0 0 \n                -iconSize \"smallIcons\" \n                -showCachedConnections 0\n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n"
		+ "\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperShadePanel\" (localizedPanelLabel(\"Hypershade\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypershade\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"visorPanel\" (localizedPanelLabel(\"Visor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Visor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"createNodePanel\" (localizedPanelLabel(\"Create Node\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Create Node\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n"
		+ "\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"polyTexturePlacementPanel\" (localizedPanelLabel(\"UV Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"UV Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"renderWindowPanel\" (localizedPanelLabel(\"Render View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Render View\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"shapePanel\" (localizedPanelLabel(\"Shape Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tshapePanel -edit -l (localizedPanelLabel(\"Shape Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"posePanel\" (localizedPanelLabel(\"Pose Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tposePanel -edit -l (localizedPanelLabel(\"Pose Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynRelEdPanel\" (localizedPanelLabel(\"Dynamic Relationships\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dynamic Relationships\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"relationshipPanel\" (localizedPanelLabel(\"Relationship Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Relationship Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n"
		+ "\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"referenceEditorPanel\" (localizedPanelLabel(\"Reference Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Reference Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"componentEditorPanel\" (localizedPanelLabel(\"Component Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Component Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynPaintScriptedPanelType\" (localizedPanelLabel(\"Paint Effects\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Paint Effects\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"scriptEditorPanel\" (localizedPanelLabel(\"Script Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Script Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"profilerPanel\" (localizedPanelLabel(\"Profiler Tool\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Profiler Tool\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"contentBrowserPanel\" (localizedPanelLabel(\"Content Browser\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Content Browser\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"Stereo\" (localizedPanelLabel(\"Stereo\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Stereo\")) -mbv $menusOkayInPanels  $panelName;\nstring $editorName = ($panelName+\"Editor\");\n            stereoCameraView -e \n                -editorChanged \"updateModelPanelBar\" \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"smoothShaded\" \n                -activeOnly 0\n                -ignorePanZoom 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -holdOuts 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 0\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n"
		+ "                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 16384\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -depthOfFieldPreview 1\n                -maxConstantTransparency 1\n                -rendererOverrideName \"stereoOverrideVP2\" \n                -objectFilterShowInHUD 1\n                -isFiltered 0\n                -colorResolution 4 4 \n                -bumpResolution 4 4 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n"
		+ "                -maximumNumHardwareLights 0\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -controllers 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -imagePlane 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -particleInstancers 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n"
		+ "                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -pluginShapes 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -motionTrails 1\n                -clipGhosts 1\n                -greasePencils 1\n                -shadows 0\n                -captureSequenceNumber -1\n                -width 0\n                -height 0\n                -sceneRenderFilter 0\n                -displayMode \"centerEye\" \n                -viewColor 0 0 0 1 \n                -useCustomBackground 1\n                $editorName;\n            stereoCameraView -e -viewSelected 0 $editorName;\n            stereoCameraView -e \n                -pluginObjects \"gpuCacheDisplayFilter\" 1 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"ToggledOutliner\")) `;\n"
		+ "\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"ToggledOutliner\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -showShapes 0\n            -showAssignedMaterials 0\n            -showTimeEditor 1\n            -showReferenceNodes 1\n            -showReferenceMembers 1\n            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n            -organizeByLayer 1\n            -organizeByClip 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showParentContainers 0\n            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUpstreamCurves 1\n            -showUnitlessCurves 1\n            -showCompounds 1\n"
		+ "            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n            -isSet 0\n            -isSetMember 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n            -niceNames 1\n            -showNamespace 1\n            -showPinIcons 0\n            -mapMotionTrails 0\n            -ignoreHiddenAttribute 0\n"
		+ "            -ignoreOutlinerColor 0\n            -renderFilterVisible 0\n            -renderFilterIndex 0\n            -selectionOrder \"chronological\" \n            -expandAttribute 0\n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"nodeEditorPanel\" (localizedPanelLabel(\"Node Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Node Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"NodeEditorEd\");\n            nodeEditor -e \n                -allAttributes 0\n                -allNodes 0\n                -autoSizeNodes 1\n                -consistentNameSize 1\n                -createNodeCommand \"nodeEdCreateNodeCommand\" \n                -connectNodeOnCreation 0\n                -connectOnDrop 0\n                -highlightConnections 0\n                -copyConnectionsOnPaste 0\n                -defaultPinnedState 0\n                -additiveGraphingMode 0\n"
		+ "                -settingsChangedCallback \"nodeEdSyncControls\" \n                -traversalDepthLimit -1\n                -keyPressCommand \"nodeEdKeyPressCommand\" \n                -nodeTitleMode \"name\" \n                -gridSnap 0\n                -gridVisibility 1\n                -crosshairOnEdgeDragging 0\n                -popupMenuScript \"nodeEdBuildPanelMenus\" \n                -showNamespace 1\n                -showShapes 1\n                -showSGShapes 0\n                -showTransforms 1\n                -useAssets 1\n                -syncedSelection 1\n                -extendToShapes 1\n                -activeTab -1\n                -editorMode \"default\" \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\tif ($useSceneConfig) {\n        string $configName = `getPanel -cwl (localizedPanelLabel(\"Current Layout\"))`;\n        if (\"\" != $configName) {\n\t\t\tpanelConfiguration -edit -label (localizedPanelLabel(\"Current Layout\")) \n\t\t\t\t-userCreated false\n\t\t\t\t-defaultImage \"vacantCell.xP:/\"\n"
		+ "\t\t\t\t-image \"\"\n\t\t\t\t-sc false\n\t\t\t\t-configString \"global string $gMainPane; paneLayout -e -cn \\\"single\\\" -ps 1 100 100 $gMainPane;\"\n\t\t\t\t-removeAllPanels\n\t\t\t\t-ap false\n\t\t\t\t\t(localizedPanelLabel(\"Persp View\")) \n\t\t\t\t\t\"modelPanel\"\n"
		+ "\t\t\t\t\t\"$panelName = `modelPanel -unParent -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels `;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -ignorePanZoom 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -holdOuts 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 0\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 16384\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -depthOfFieldPreview 1\\n    -maxConstantTransparency 1\\n    -rendererName \\\"vp2Renderer\\\" \\n    -objectFilterShowInHUD 1\\n    -isFiltered 0\\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -controllers 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 1\\n    -imagePlane 1\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -particleInstancers 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -pluginShapes 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -motionTrails 1\\n    -clipGhosts 1\\n    -greasePencils 1\\n    -shadows 0\\n    -captureSequenceNumber -1\\n    -width 1097\\n    -height 696\\n    -sceneRenderFilter 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName;\\nmodelEditor -e \\n    -pluginObjects \\\"gpuCacheDisplayFilter\\\" 1 \\n    $editorName\"\n"
		+ "\t\t\t\t\t\"modelPanel -edit -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels  $panelName;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -ignorePanZoom 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -holdOuts 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 0\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 16384\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -depthOfFieldPreview 1\\n    -maxConstantTransparency 1\\n    -rendererName \\\"vp2Renderer\\\" \\n    -objectFilterShowInHUD 1\\n    -isFiltered 0\\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -controllers 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 1\\n    -imagePlane 1\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -particleInstancers 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -pluginShapes 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -motionTrails 1\\n    -clipGhosts 1\\n    -greasePencils 1\\n    -shadows 0\\n    -captureSequenceNumber -1\\n    -width 1097\\n    -height 696\\n    -sceneRenderFilter 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName;\\nmodelEditor -e \\n    -pluginObjects \\\"gpuCacheDisplayFilter\\\" 1 \\n    $editorName\"\n"
		+ "\t\t\t\t$configName;\n\n            setNamedPanelLayout (localizedPanelLabel(\"Current Layout\"));\n        }\n\n        panelHistory -e -clear mainPanelHistory;\n        sceneUIReplacement -clear;\n\t}\n\n\ngrid -spacing 5 -size 12 -divisions 5 -displayAxes yes -displayGridLines yes -displayDivisionLines yes -displayPerspectiveLabels no -displayOrthographicLabels no -displayAxesBold yes -perspectiveLabelPosition axis -orthographicLabelPosition edge;\nviewManip -drawCompass 0 -compassAngle 0 -frontParameters \"\" -homeParameters \"\" -selectionLockParameters \"\";\n}\n");
	setAttr ".st" 3;
createNode script -n "sceneConfigurationScriptNode";
	rename -uid "0E8379E5-4AD0-51E0-C6D1-939F2A51AD00";
	setAttr ".b" -type "string" "playbackOptions -min 1 -max 120 -ast 1 -aet 200 ";
	setAttr ".st" 6;
createNode nodeGraphEditorInfo -n "hyperShadePrimaryNodeEditorSavedTabsInfo";
	rename -uid "57BD5980-4DDB-C177-E88C-DAA1C09C36D2";
	setAttr ".tgi[0].tn" -type "string" "无标题_1";
	setAttr ".tgi[0].vl" -type "double2" -323.80951094248991 -326.19046322883179 ;
	setAttr ".tgi[0].vh" -type "double2" -167.85713618709957 326.19046322883179 ;
	setAttr -s 68 ".tgi[0].ni";
	setAttr ".tgi[0].ni[0].x" -18790;
	setAttr ".tgi[0].ni[0].y" 1127.142822265625;
	setAttr ".tgi[0].ni[0].nvs" 1922;
	setAttr ".tgi[0].ni[1].x" 2447.142822265625;
	setAttr ".tgi[0].ni[1].y" 1565.7142333984375;
	setAttr ".tgi[0].ni[1].nvs" 1922;
	setAttr ".tgi[0].ni[2].x" 2140;
	setAttr ".tgi[0].ni[2].y" 1645.7142333984375;
	setAttr ".tgi[0].ni[2].nvs" 1922;
	setAttr ".tgi[0].ni[3].x" 4597.14306640625;
	setAttr ".tgi[0].ni[3].y" 915.71429443359375;
	setAttr ".tgi[0].ni[3].nvs" 1922;
	setAttr ".tgi[0].ni[4].x" 5518.5712890625;
	setAttr ".tgi[0].ni[4].y" 718.5714111328125;
	setAttr ".tgi[0].ni[4].nvs" 1922;
	setAttr ".tgi[0].ni[5].x" 4904.28564453125;
	setAttr ".tgi[0].ni[5].y" 897.14288330078125;
	setAttr ".tgi[0].ni[5].nvs" 1922;
	setAttr ".tgi[0].ni[6].x" 2754.28564453125;
	setAttr ".tgi[0].ni[6].y" 1487.142822265625;
	setAttr ".tgi[0].ni[6].nvs" 1922;
	setAttr ".tgi[0].ni[7].x" 4290;
	setAttr ".tgi[0].ni[7].y" 911.4285888671875;
	setAttr ".tgi[0].ni[7].nvs" 1922;
	setAttr ".tgi[0].ni[8].x" 911.4285888671875;
	setAttr ".tgi[0].ni[8].y" 1615.7142333984375;
	setAttr ".tgi[0].ni[8].nvs" 1922;
	setAttr ".tgi[0].ni[9].x" 604.28570556640625;
	setAttr ".tgi[0].ni[9].y" 1217.142822265625;
	setAttr ".tgi[0].ni[9].nvs" 1922;
	setAttr ".tgi[0].ni[10].x" 5211.4287109375;
	setAttr ".tgi[0].ni[10].y" 738.5714111328125;
	setAttr ".tgi[0].ni[10].nvs" 1922;
	setAttr ".tgi[0].ni[11].x" 1832.857177734375;
	setAttr ".tgi[0].ni[11].y" 1714.2857666015625;
	setAttr ".tgi[0].ni[11].nvs" 1922;
	setAttr ".tgi[0].ni[12].x" 1525.7142333984375;
	setAttr ".tgi[0].ni[12].y" 1840;
	setAttr ".tgi[0].ni[12].nvs" 1922;
	setAttr ".tgi[0].ni[13].x" 1218.5714111328125;
	setAttr ".tgi[0].ni[13].y" 1518.5714111328125;
	setAttr ".tgi[0].ni[13].nvs" 1922;
	setAttr ".tgi[0].ni[14].x" 7975.71435546875;
	setAttr ".tgi[0].ni[14].y" 542.85711669921875;
	setAttr ".tgi[0].ni[14].nvs" 1922;
	setAttr ".tgi[0].ni[15].x" 7668.5712890625;
	setAttr ".tgi[0].ni[15].y" 665.71429443359375;
	setAttr ".tgi[0].ni[15].nvs" 1922;
	setAttr ".tgi[0].ni[16].x" -317.14285278320313;
	setAttr ".tgi[0].ni[16].y" 1281.4285888671875;
	setAttr ".tgi[0].ni[16].nvs" 1922;
	setAttr ".tgi[0].ni[17].x" 11661.4287109375;
	setAttr ".tgi[0].ni[17].y" 40;
	setAttr ".tgi[0].ni[17].nvs" 1922;
	setAttr ".tgi[0].ni[18].x" 3675.71435546875;
	setAttr ".tgi[0].ni[18].y" 1005.7142944335938;
	setAttr ".tgi[0].ni[18].nvs" 1922;
	setAttr ".tgi[0].ni[19].x" 6132.85693359375;
	setAttr ".tgi[0].ni[19].y" 561.4285888671875;
	setAttr ".tgi[0].ni[19].nvs" 1922;
	setAttr ".tgi[0].ni[20].x" 7361.4287109375;
	setAttr ".tgi[0].ni[20].y" 897.14288330078125;
	setAttr ".tgi[0].ni[20].nvs" 1922;
	setAttr ".tgi[0].ni[21].x" 8282.857421875;
	setAttr ".tgi[0].ni[21].y" 431.42855834960938;
	setAttr ".tgi[0].ni[21].nvs" 1922;
	setAttr ".tgi[0].ni[22].x" 3061.428466796875;
	setAttr ".tgi[0].ni[22].y" 1290;
	setAttr ".tgi[0].ni[22].nvs" 1922;
	setAttr ".tgi[0].ni[23].x" 10125.7138671875;
	setAttr ".tgi[0].ni[23].y" 261.42855834960938;
	setAttr ".tgi[0].ni[23].nvs" 1922;
	setAttr ".tgi[0].ni[24].x" 10432.857421875;
	setAttr ".tgi[0].ni[24].y" 270;
	setAttr ".tgi[0].ni[24].nvs" 1922;
	setAttr ".tgi[0].ni[25].x" 7054.28564453125;
	setAttr ".tgi[0].ni[25].y" 602.85711669921875;
	setAttr ".tgi[0].ni[25].nvs" 1922;
	setAttr ".tgi[0].ni[26].x" 8590;
	setAttr ".tgi[0].ni[26].y" 481.42855834960938;
	setAttr ".tgi[0].ni[26].nvs" 1922;
	setAttr ".tgi[0].ni[27].x" 9204.2861328125;
	setAttr ".tgi[0].ni[27].y" 394.28570556640625;
	setAttr ".tgi[0].ni[27].nvs" 1922;
	setAttr ".tgi[0].ni[28].x" 9511.4287109375;
	setAttr ".tgi[0].ni[28].y" 365.71429443359375;
	setAttr ".tgi[0].ni[28].nvs" 1922;
	setAttr ".tgi[0].ni[29].x" 11047.142578125;
	setAttr ".tgi[0].ni[29].y" 154.28572082519531;
	setAttr ".tgi[0].ni[29].nvs" 1922;
	setAttr ".tgi[0].ni[30].x" 5825.71435546875;
	setAttr ".tgi[0].ni[30].y" 584.28570556640625;
	setAttr ".tgi[0].ni[30].nvs" 1922;
	setAttr ".tgi[0].ni[31].x" 8897.142578125;
	setAttr ".tgi[0].ni[31].y" 387.14285278320313;
	setAttr ".tgi[0].ni[31].nvs" 1922;
	setAttr ".tgi[0].ni[32].x" 3982.857177734375;
	setAttr ".tgi[0].ni[32].y" 954.28570556640625;
	setAttr ".tgi[0].ni[32].nvs" 1922;
	setAttr ".tgi[0].ni[33].x" 11354.2861328125;
	setAttr ".tgi[0].ni[33].y" 31.428571701049805;
	setAttr ".tgi[0].ni[33].nvs" 1922;
	setAttr ".tgi[0].ni[34].x" 12890;
	setAttr ".tgi[0].ni[34].y" -192.85714721679688;
	setAttr ".tgi[0].ni[34].nvs" 1922;
	setAttr ".tgi[0].ni[35].x" 13811.4287109375;
	setAttr ".tgi[0].ni[35].y" -114.28571319580078;
	setAttr ".tgi[0].ni[35].nvs" 1922;
	setAttr ".tgi[0].ni[36].x" 13504.2861328125;
	setAttr ".tgi[0].ni[36].y" -325.71429443359375;
	setAttr ".tgi[0].ni[36].nvs" 1922;
	setAttr ".tgi[0].ni[37].x" 6440;
	setAttr ".tgi[0].ni[37].y" 428.57144165039063;
	setAttr ".tgi[0].ni[37].nvs" 1922;
	setAttr ".tgi[0].ni[38].x" 11968.5712890625;
	setAttr ".tgi[0].ni[38].y" -82.857139587402344;
	setAttr ".tgi[0].ni[38].nvs" 1922;
	setAttr ".tgi[0].ni[39].x" 13197.142578125;
	setAttr ".tgi[0].ni[39].y" -197.14285278320313;
	setAttr ".tgi[0].ni[39].nvs" 1922;
	setAttr ".tgi[0].ni[40].x" -10;
	setAttr ".tgi[0].ni[40].y" 1317.142822265625;
	setAttr ".tgi[0].ni[40].nvs" 1922;
	setAttr ".tgi[0].ni[41].x" 6747.14306640625;
	setAttr ".tgi[0].ni[41].y" 791.4285888671875;
	setAttr ".tgi[0].ni[41].nvs" 1922;
	setAttr ".tgi[0].ni[42].x" 9818.5712890625;
	setAttr ".tgi[0].ni[42].y" 384.28570556640625;
	setAttr ".tgi[0].ni[42].nvs" 1922;
	setAttr ".tgi[0].ni[43].x" 3368.571533203125;
	setAttr ".tgi[0].ni[43].y" 1224.2857666015625;
	setAttr ".tgi[0].ni[43].nvs" 1922;
	setAttr ".tgi[0].ni[44].x" 10740;
	setAttr ".tgi[0].ni[44].y" 147.14285278320313;
	setAttr ".tgi[0].ni[44].nvs" 1922;
	setAttr ".tgi[0].ni[45].x" 12275.7138671875;
	setAttr ".tgi[0].ni[45].y" -74.285713195800781;
	setAttr ".tgi[0].ni[45].nvs" 1922;
	setAttr ".tgi[0].ni[46].x" 297.14285278320313;
	setAttr ".tgi[0].ni[46].y" 1342.857177734375;
	setAttr ".tgi[0].ni[46].nvs" 1922;
	setAttr ".tgi[0].ni[47].x" 12582.857421875;
	setAttr ".tgi[0].ni[47].y" -67.142860412597656;
	setAttr ".tgi[0].ni[47].nvs" 1922;
	setAttr ".tgi[0].ni[48].x" -492.85714721679688;
	setAttr ".tgi[0].ni[48].y" 50;
	setAttr ".tgi[0].ni[48].nvs" 1923;
	setAttr ".tgi[0].ni[49].x" 14732.857421875;
	setAttr ".tgi[0].ni[49].y" -594.28570556640625;
	setAttr ".tgi[0].ni[49].nvs" 1922;
	setAttr ".tgi[0].ni[50].x" -185.71427917480469;
	setAttr ".tgi[0].ni[50].y" 77.142860412597656;
	setAttr ".tgi[0].ni[50].nvs" 1923;
	setAttr ".tgi[0].ni[51].x" 15347.142578125;
	setAttr ".tgi[0].ni[51].y" -741.4285888671875;
	setAttr ".tgi[0].ni[51].nvs" 1922;
	setAttr ".tgi[0].ni[52].x" 14425.7138671875;
	setAttr ".tgi[0].ni[52].y" -488.57144165039063;
	setAttr ".tgi[0].ni[52].nvs" 1922;
	setAttr ".tgi[0].ni[53].x" 14118.5712890625;
	setAttr ".tgi[0].ni[53].y" -354.28570556640625;
	setAttr ".tgi[0].ni[53].nvs" 1922;
	setAttr ".tgi[0].ni[54].x" 15040;
	setAttr ".tgi[0].ni[54].y" -682.85711669921875;
	setAttr ".tgi[0].ni[54].nvs" 1922;
	setAttr ".tgi[0].ni[55].x" 18111.427734375;
	setAttr ".tgi[0].ni[55].y" -1181.4285888671875;
	setAttr ".tgi[0].ni[55].nvs" 1922;
	setAttr ".tgi[0].ni[56].x" 17804.28515625;
	setAttr ".tgi[0].ni[56].y" -1131.4285888671875;
	setAttr ".tgi[0].ni[56].nvs" 1922;
	setAttr ".tgi[0].ni[57].x" 15654.2861328125;
	setAttr ".tgi[0].ni[57].y" -477.14285278320313;
	setAttr ".tgi[0].ni[57].nvs" 1922;
	setAttr ".tgi[0].ni[58].x" 15961.4287109375;
	setAttr ".tgi[0].ni[58].y" -148.57142639160156;
	setAttr ".tgi[0].ni[58].nvs" 1922;
	setAttr ".tgi[0].ni[59].x" 17497.142578125;
	setAttr ".tgi[0].ni[59].y" -640;
	setAttr ".tgi[0].ni[59].nvs" 1922;
	setAttr ".tgi[0].ni[60].x" 16575.71484375;
	setAttr ".tgi[0].ni[60].y" -297.14285278320313;
	setAttr ".tgi[0].ni[60].nvs" 1922;
	setAttr ".tgi[0].ni[61].x" 16882.857421875;
	setAttr ".tgi[0].ni[61].y" -648.5714111328125;
	setAttr ".tgi[0].ni[61].nvs" 1922;
	setAttr ".tgi[0].ni[62].x" 16268.5712890625;
	setAttr ".tgi[0].ni[62].y" -434.28570556640625;
	setAttr ".tgi[0].ni[62].nvs" 1922;
	setAttr ".tgi[0].ni[63].x" 17190;
	setAttr ".tgi[0].ni[63].y" -754.28570556640625;
	setAttr ".tgi[0].ni[63].nvs" 1922;
	setAttr ".tgi[0].ni[64].x" -91.428573608398438;
	setAttr ".tgi[0].ni[64].y" 104.28571319580078;
	setAttr ".tgi[0].ni[64].nvs" 1922;
	setAttr ".tgi[0].ni[65].x" 15654.2861328125;
	setAttr ".tgi[0].ni[65].y" -727.14288330078125;
	setAttr ".tgi[0].ni[65].nvs" 1922;
	setAttr ".tgi[0].ni[66].x" 15347.142578125;
	setAttr ".tgi[0].ni[66].y" -331.42855834960938;
	setAttr ".tgi[0].ni[66].nvs" 1922;
	setAttr ".tgi[0].ni[67].x" 61.428569793701172;
	setAttr ".tgi[0].ni[67].y" -318.57144165039063;
	setAttr ".tgi[0].ni[67].nvs" 1923;
select -ne :time1;
	setAttr -av -k on ".cch";
	setAttr -av -cb on ".ihi";
	setAttr -av -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr ".o" 1;
	setAttr -av ".unw" 1;
	setAttr -k on ".etw";
	setAttr -k on ".tps";
	setAttr -av -k on ".tms";
select -ne :hardwareRenderingGlobals;
	setAttr -k on ".ihi";
	setAttr ".otfna" -type "stringArray" 22 "NURBS Curves" "NURBS Surfaces" "Polygons" "Subdiv Surface" "Particles" "Particle Instance" "Fluids" "Strokes" "Image Planes" "UI" "Lights" "Cameras" "Locators" "Joints" "IK Handles" "Deformers" "Motion Trails" "Components" "Hair Systems" "Follicles" "Misc. UI" "Ornaments"  ;
	setAttr ".otfva" -type "Int32Array" 22 0 1 1 1 1 1
		 1 1 1 0 0 0 0 0 0 0 0 0
		 0 0 0 0 ;
	setAttr -av ".aoam";
	setAttr -k on ".mbsof";
	setAttr ".fprt" yes;
select -ne :renderPartition;
	setAttr -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr -s 2 ".st";
	setAttr -cb on ".an";
	setAttr -cb on ".pt";
select -ne :renderGlobalsList1;
	setAttr -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -k on ".nds";
	setAttr -cb on ".bnm";
select -ne :defaultShaderList1;
	setAttr -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr -s 4 ".s";
select -ne :postProcessList1;
	setAttr -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr -s 2 ".p";
select -ne :defaultRenderUtilityList1;
select -ne :defaultRenderingList1;
	setAttr -k on ".ihi";
select -ne :defaultTextureList1;
select -ne :lambert1;
select -ne :initialShadingGroup;
	setAttr -av -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -av -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr -s 2 ".dsm";
	setAttr -k on ".mwc";
	setAttr -cb on ".an";
	setAttr -cb on ".il";
	setAttr -cb on ".vo";
	setAttr -cb on ".eo";
	setAttr -cb on ".fo";
	setAttr -cb on ".epo";
	setAttr ".ro" yes;
select -ne :initialParticleSE;
	setAttr -av -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -av -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr -k on ".mwc";
	setAttr -cb on ".an";
	setAttr -cb on ".il";
	setAttr -cb on ".vo";
	setAttr -cb on ".eo";
	setAttr -cb on ".fo";
	setAttr -cb on ".epo";
	setAttr ".ro" yes;
select -ne :initialMaterialInfo;
select -ne :defaultResolution;
	setAttr -av -k on ".cch";
	setAttr -k on ".ihi";
	setAttr -av -k on ".nds";
	setAttr -k on ".bnm";
	setAttr -av -k on ".w";
	setAttr -av -k on ".h";
	setAttr -av ".pa" 1;
	setAttr -av -k on ".al";
	setAttr -av -k on ".dar";
	setAttr -av -k on ".ldar";
	setAttr -av -k on ".dpi";
	setAttr -av -k on ".off";
	setAttr -av -k on ".fld";
	setAttr -av -k on ".zsl";
	setAttr -k on ".isu";
	setAttr -k on ".pdu";
select -ne :hardwareRenderGlobals;
	setAttr -k on ".cch";
	setAttr -cb on ".ihi";
	setAttr -k on ".nds";
	setAttr -cb on ".bnm";
	setAttr ".ctrs" 256;
	setAttr -av ".btrs" 512;
	setAttr -k off -cb on ".fbfm";
	setAttr -k off -cb on ".ehql";
	setAttr -k off -cb on ".eams";
	setAttr -k off -cb on ".eeaa";
	setAttr -k off -cb on ".engm";
	setAttr -k off -cb on ".mes";
	setAttr -k off -cb on ".emb";
	setAttr -av -k off -cb on ".mbbf";
	setAttr -k off -cb on ".mbs";
	setAttr -k off -cb on ".trm";
	setAttr -k off -cb on ".tshc";
	setAttr -k off -cb on ".enpt";
	setAttr -k off -cb on ".clmt";
	setAttr -k off -cb on ".tcov";
	setAttr -k off -cb on ".lith";
	setAttr -k off -cb on ".sobc";
	setAttr -k off -cb on ".cuth";
	setAttr -k off -cb on ".hgcd";
	setAttr -k off -cb on ".hgci";
	setAttr -k off -cb on ".mgcs";
	setAttr -k off -cb on ".twa";
	setAttr -k off -cb on ".twz";
	setAttr -k on ".hwcc";
	setAttr -k on ".hwdp";
	setAttr -k on ".hwql";
	setAttr -k on ".hwfr";
	setAttr -k on ".soll";
	setAttr -k on ".sosl";
	setAttr -k on ".bswa";
	setAttr -k on ".shml";
	setAttr -k on ".hwel";
connectAttr "polyTweakUV1.out" "pCubeShape1.i";
connectAttr "polyTweakUV1.uvtk[0]" "pCubeShape1.uvst[0].uvtw";
relationship "link" ":lightLinker1" ":initialShadingGroup.message" ":defaultLightSet.message";
relationship "link" ":lightLinker1" ":initialParticleSE.message" ":defaultLightSet.message";
relationship "shadowLink" ":lightLinker1" ":initialShadingGroup.message" ":defaultLightSet.message";
relationship "shadowLink" ":lightLinker1" ":initialParticleSE.message" ":defaultLightSet.message";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "polyTweak1.out" "polyExtrudeFace1.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace1.mp";
connectAttr "polyCube1.out" "polyTweak1.ip";
connectAttr "polyTweak2.out" "polyExtrudeFace2.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace2.mp";
connectAttr "polyExtrudeFace1.out" "polyTweak2.ip";
connectAttr "polyTweak3.out" "polySplitRing1.ip";
connectAttr "pCubeShape1.wm" "polySplitRing1.mp";
connectAttr "polyExtrudeFace2.out" "polyTweak3.ip";
connectAttr "polySplitRing1.out" "polyExtrudeFace3.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace3.mp";
connectAttr "polyTweak4.out" "polyExtrudeFace4.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace4.mp";
connectAttr "polyExtrudeFace3.out" "polyTweak4.ip";
connectAttr "polyExtrudeFace4.out" "polySplit1.ip";
connectAttr "polySplit1.out" "polySplit2.ip";
connectAttr "polySplit2.out" "polySplit3.ip";
connectAttr "polySplit3.out" "polySplit4.ip";
connectAttr "polyTweak5.out" "polyExtrudeFace5.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace5.mp";
connectAttr "polySplit4.out" "polyTweak5.ip";
connectAttr "polyTweak6.out" "polyExtrudeFace6.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace6.mp";
connectAttr "polyExtrudeFace5.out" "polyTweak6.ip";
connectAttr "polyExtrudeFace6.out" "polyTweak7.ip";
connectAttr "polyTweak7.out" "polySplit5.ip";
connectAttr "polySplit5.out" "polySplit6.ip";
connectAttr "polySplit6.out" "polySplit7.ip";
connectAttr "polySplit7.out" "polyTweak8.ip";
connectAttr "polyTweak8.out" "polySplit8.ip";
connectAttr "polyTweak9.out" "polySplitRing2.ip";
connectAttr "pCubeShape1.wm" "polySplitRing2.mp";
connectAttr "polySplit8.out" "polyTweak9.ip";
connectAttr "polySplitRing2.out" "polyTweak10.ip";
connectAttr "polyTweak10.out" "polySplit9.ip";
connectAttr "polySplit9.out" "polySplit10.ip";
connectAttr "polySplit10.out" "polyTweak11.ip";
connectAttr "polyTweak11.out" "polySplit11.ip";
connectAttr "polySplit11.out" "polyTweak12.ip";
connectAttr "polyTweak12.out" "polySplit12.ip";
connectAttr "polyTweak13.out" "polyExtrudeFace7.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace7.mp";
connectAttr "polySplit12.out" "polyTweak13.ip";
connectAttr "polyTweak14.out" "polyExtrudeFace8.ip";
connectAttr "pCubeShape1.wm" "polyExtrudeFace8.mp";
connectAttr "polyExtrudeFace7.out" "polyTweak14.ip";
connectAttr "polyTweak15.out" "polySplitRing3.ip";
connectAttr "pCubeShape1.wm" "polySplitRing3.mp";
connectAttr "polyExtrudeFace8.out" "polyTweak15.ip";
connectAttr "polyTweak16.out" "polyCut1.ip";
connectAttr "pCubeShape1.wm" "polyCut1.mp";
connectAttr "polySplitRing3.out" "polyTweak16.ip";
connectAttr "polyTweak17.out" "polySplitRing4.ip";
connectAttr "pCubeShape1.wm" "polySplitRing4.mp";
connectAttr "polyCut1.out" "polyTweak17.ip";
connectAttr "polySplitRing4.out" "polyTweak18.ip";
connectAttr "polyTweak18.out" "polySplit13.ip";
connectAttr "polySplit13.out" "polyTweak19.ip";
connectAttr "polyTweak19.out" "polySplit14.ip";
connectAttr "polySplit14.out" "polyTweak20.ip";
connectAttr "polyTweak20.out" "polySplit15.ip";
connectAttr "polySplit15.out" "polyTweak21.ip";
connectAttr "polyTweak21.out" "polySplit16.ip";
connectAttr "polySplit16.out" "polyTweak22.ip";
connectAttr "polyTweak22.out" "polySplit17.ip";
connectAttr "polySplit17.out" "polySplit18.ip";
connectAttr "polySplit18.out" "polyTweak23.ip";
connectAttr "polyTweak23.out" "polySplit19.ip";
connectAttr "polyTweak24.out" "polySmoothFace1.ip";
connectAttr "polySplit19.out" "polyTweak24.ip";
connectAttr "polySmoothFace1.out" "polyMapCut1.ip";
connectAttr "polyMapCut1.out" "polyPlanarProj1.ip";
connectAttr "pCubeShape1.wm" "polyPlanarProj1.mp";
connectAttr "polyPlanarProj1.out" "polyMapCut2.ip";
connectAttr "polyMapCut2.out" "polyMapCut3.ip";
connectAttr "polyMapCut3.out" "polyTweakUV1.ip";
connectAttr ":defaultColorMgtGlobals.cme" "file1.cme";
connectAttr ":defaultColorMgtGlobals.cfe" "file1.cmcf";
connectAttr ":defaultColorMgtGlobals.cfp" "file1.cmcp";
connectAttr ":defaultColorMgtGlobals.wsn" "file1.ws";
connectAttr "place2dTexture1.c" "file1.c";
connectAttr "place2dTexture1.tf" "file1.tf";
connectAttr "place2dTexture1.rf" "file1.rf";
connectAttr "place2dTexture1.mu" "file1.mu";
connectAttr "place2dTexture1.mv" "file1.mv";
connectAttr "place2dTexture1.s" "file1.s";
connectAttr "place2dTexture1.wu" "file1.wu";
connectAttr "place2dTexture1.wv" "file1.wv";
connectAttr "place2dTexture1.re" "file1.re";
connectAttr "place2dTexture1.of" "file1.of";
connectAttr "place2dTexture1.r" "file1.ro";
connectAttr "place2dTexture1.n" "file1.n";
connectAttr "place2dTexture1.vt1" "file1.vt1";
connectAttr "place2dTexture1.vt2" "file1.vt2";
connectAttr "place2dTexture1.vt3" "file1.vt3";
connectAttr "place2dTexture1.vc1" "file1.vc1";
connectAttr "place2dTexture1.o" "file1.uv";
connectAttr "place2dTexture1.ofs" "file1.fs";
connectAttr "polySplit1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[0].dn"
		;
connectAttr "polySplit6.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[1].dn"
		;
connectAttr "polySplit5.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[2].dn"
		;
connectAttr "polySplit9.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[3].dn"
		;
connectAttr "polySplit11.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[4].dn"
		;
connectAttr "polySplit10.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[5].dn"
		;
connectAttr "polySplit7.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[6].dn"
		;
connectAttr "polyTweak10.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[7].dn"
		;
connectAttr "polyExtrudeFace5.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[8].dn"
		;
connectAttr "polyTweak5.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[9].dn"
		;
connectAttr "polyTweak11.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[10].dn"
		;
connectAttr "polyTweak7.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[11].dn"
		;
connectAttr "polyExtrudeFace6.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[12].dn"
		;
connectAttr "polyTweak6.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[13].dn"
		;
connectAttr "polySplitRing3.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[14].dn"
		;
connectAttr "polyTweak15.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[15].dn"
		;
connectAttr "polySplit2.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[16].dn"
		;
connectAttr "polySplit16.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[17].dn"
		;
connectAttr "polyTweak9.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[18].dn"
		;
connectAttr "polySplit12.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[19].dn"
		;
connectAttr "polyExtrudeFace8.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[20].dn"
		;
connectAttr "polyTweak16.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[21].dn"
		;
connectAttr "polyTweak8.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[22].dn"
		;
connectAttr "polyTweak19.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[23].dn"
		;
connectAttr "polySplit14.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[24].dn"
		;
connectAttr "polyTweak14.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[25].dn"
		;
connectAttr "polyCut1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[26].dn"
		;
connectAttr "polySplitRing4.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[27].dn"
		;
connectAttr "polyTweak18.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[28].dn"
		;
connectAttr "polySplit15.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[29].dn"
		;
connectAttr "polyTweak12.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[30].dn"
		;
connectAttr "polyTweak17.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[31].dn"
		;
connectAttr "polySplitRing2.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[32].dn"
		;
connectAttr "polyTweak21.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[33].dn"
		;
connectAttr "polyTweak23.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[34].dn"
		;
connectAttr "polySmoothFace1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[35].dn"
		;
connectAttr "polyTweak24.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[36].dn"
		;
connectAttr "polyTweak13.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[37].dn"
		;
connectAttr "polyTweak22.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[38].dn"
		;
connectAttr "polySplit19.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[39].dn"
		;
connectAttr "polySplit3.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[40].dn"
		;
connectAttr "polyExtrudeFace7.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[41].dn"
		;
connectAttr "polySplit13.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[42].dn"
		;
connectAttr "polySplit8.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[43].dn"
		;
connectAttr "polyTweak20.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[44].dn"
		;
connectAttr "polySplit17.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[45].dn"
		;
connectAttr "polySplit4.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[46].dn"
		;
connectAttr "polySplit18.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[47].dn"
		;
connectAttr "place2dTexture1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[48].dn"
		;
connectAttr "polyMapCut2.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[49].dn"
		;
connectAttr "file1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[50].dn"
		;
connectAttr "polyTweakUV1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[51].dn"
		;
connectAttr "polyPlanarProj1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[52].dn"
		;
connectAttr "polyMapCut1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[53].dn"
		;
connectAttr "polyMapCut3.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[54].dn"
		;
connectAttr "polyExtrudeFace4.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[55].dn"
		;
connectAttr "polyTweak4.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[56].dn"
		;
connectAttr "polyTweak1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[57].dn"
		;
connectAttr "polyExtrudeFace1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[58].dn"
		;
connectAttr "polyExtrudeFace3.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[59].dn"
		;
connectAttr "polyExtrudeFace2.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[60].dn"
		;
connectAttr "polyTweak3.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[61].dn"
		;
connectAttr "polyTweak2.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[62].dn"
		;
connectAttr "polySplitRing1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[63].dn"
		;
connectAttr "defaultRenderLayer.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[64].dn"
		;
connectAttr "pCubeShape1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[65].dn"
		;
connectAttr "polyCube1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[66].dn"
		;
connectAttr "pCube1.msg" "hyperShadePrimaryNodeEditorSavedTabsInfo.tgi[0].ni[67].dn"
		;
connectAttr "place2dTexture1.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "defaultRenderLayer.msg" ":defaultRenderingList1.r" -na;
connectAttr "file1.msg" ":defaultTextureList1.tx" -na;
connectAttr "file1.oc" ":lambert1.c";
connectAttr "pCubeShape1.iog" ":initialShadingGroup.dsm" -na;
connectAttr "file1.msg" ":initialMaterialInfo.t" -na;
// End of cap.ma
