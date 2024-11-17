"use strict";(self.webpackChunkreact_demo=self.webpackChunkreact_demo||[]).push([[763],{6022:(e,t,a)=>{function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{S:()=>i}),(0,a(8886).K2)(i,"populateCommonDb")},2763:(e,t,a)=>{a.d(t,{diagram:()=>b});var i=a(6022),n=a(5039),r=a(1021),l=a(8886),s=a(8731),o=a(4852),c=l.UI.pie,p={sections:new Map,showData:!1,config:c},d=p.sections,g=p.showData,u=structuredClone(c),h=(0,l.K2)((()=>structuredClone(u)),"getConfig"),m=(0,l.K2)((()=>{d=new Map,g=p.showData,(0,l.IU)()}),"clear"),f=(0,l.K2)((({label:e,value:t})=>{d.has(e)||(d.set(e,t),l.Rm.debug(`added new section: ${e}, with value: ${t}`))}),"addSection"),S=(0,l.K2)((()=>d),"getSections"),x=(0,l.K2)((e=>{g=e}),"setShowData"),w=(0,l.K2)((()=>g),"getShowData"),D={getConfig:h,clear:m,setDiagramTitle:l.ke,getDiagramTitle:l.ab,setAccTitle:l.SV,getAccTitle:l.iN,setAccDescription:l.EI,getAccDescription:l.m7,addSection:f,getSections:S,setShowData:x,getShowData:w},T=(0,l.K2)(((e,t)=>{(0,i.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)}),"populateDb"),$={parse:(0,l.K2)((async e=>{const t=await(0,s.qg)("pie",e);l.Rm.debug(t),T(t,D)}),"parse")},y=(0,l.K2)((e=>`\n  .pieCircle{\n    stroke: ${e.pieStrokeColor};\n    stroke-width : ${e.pieStrokeWidth};\n    opacity : ${e.pieOpacity};\n  }\n  .pieOuterCircle{\n    stroke: ${e.pieOuterStrokeColor};\n    stroke-width: ${e.pieOuterStrokeWidth};\n    fill: none;\n  }\n  .pieTitleText {\n    text-anchor: middle;\n    font-size: ${e.pieTitleTextSize};\n    fill: ${e.pieTitleTextColor};\n    font-family: ${e.fontFamily};\n  }\n  .slice {\n    font-family: ${e.fontFamily};\n    fill: ${e.pieSectionTextColor};\n    font-size:${e.pieSectionTextSize};\n    // fill: white;\n  }\n  .legend text {\n    fill: ${e.pieLegendTextColor};\n    font-family: ${e.fontFamily};\n    font-size: ${e.pieLegendTextSize};\n  }\n`),"getStyles"),C=(0,l.K2)((e=>{const t=[...e.entries()].map((e=>({label:e[0],value:e[1]}))).sort(((e,t)=>t.value-e.value));return(0,o.rLf)().value((e=>e.value))(t)}),"createPieArcs"),b={parser:$,db:D,renderer:{draw:(0,l.K2)(((e,t,a,i)=>{l.Rm.debug("rendering pie chart\n"+e);const s=i.db,c=(0,l.D7)(),p=(0,n.$t)(s.getConfig(),c.pie),d=(0,r.D)(t),g=d.append("g");g.attr("transform","translate(225,225)");const{themeVariables:u}=c;let[h]=(0,n.I5)(u.pieOuterStrokeWidth);h??=2;const m=p.textPosition,f=Math.min(450,450)/2-40,S=(0,o.JLW)().innerRadius(0).outerRadius(f),x=(0,o.JLW)().innerRadius(f*m).outerRadius(f*m);g.append("circle").attr("cx",0).attr("cy",0).attr("r",f+h/2).attr("class","pieOuterCircle");const w=s.getSections(),D=C(w),T=[u.pie1,u.pie2,u.pie3,u.pie4,u.pie5,u.pie6,u.pie7,u.pie8,u.pie9,u.pie10,u.pie11,u.pie12],$=(0,o.UMr)(T);g.selectAll("mySlices").data(D).enter().append("path").attr("d",S).attr("fill",(e=>$(e.data.label))).attr("class","pieCircle");let y=0;w.forEach((e=>{y+=e})),g.selectAll("mySlices").data(D).enter().append("text").text((e=>(e.data.value/y*100).toFixed(0)+"%")).attr("transform",(e=>"translate("+x.centroid(e)+")")).style("text-anchor","middle").attr("class","slice"),g.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");const b=g.selectAll(".legend").data($.domain()).enter().append("g").attr("class","legend").attr("transform",((e,t)=>"translate(216,"+(22*t-22*$.domain().length/2)+")"));b.append("rect").attr("width",18).attr("height",18).style("fill",$).style("stroke",$),b.data(D).append("text").attr("x",22).attr("y",14).text((e=>{const{label:t,value:a}=e.data;return s.getShowData()?`${t} [${a}]`:t}));const k=512+Math.max(...b.selectAll("text").nodes().map((e=>e?.getBoundingClientRect().width??0)));d.attr("viewBox",`0 0 ${k} 450`),(0,l.a$)(d,450,k,p.useMaxWidth)}),"draw")},styles:y}}}]);