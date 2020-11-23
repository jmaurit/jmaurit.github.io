// updated 23.8.2020
class econFigure{
  constructor(canvasID, xOffset = 20, yOffset=20){
  this.myCanvas = document.getElementById(canvasID);
  this.xOffset=xOffset;
  this.yOffset=yOffset;
  this.ctx = this.myCanvas.getContext("2d");
  this.ctx.font = '20px Arial';
  this.w = this.myCanvas.width;
  this.h = this.myCanvas.height;
  this.A = 1;
  this.a = 1;
  this.b = 1;
  this.U = 1500;
  this.indiffFunc="cd";
  this.xshift=0;
  this.ymin=0;
  self=this;

  this.originalTransform = this.ctx.getTransform();
  this.ctx.setTransform(1, 0, 0, -1, this.xOffset, this.h-this.yOffset);
  this.coordTransform = this.ctx.getTransform();
    }

  xcoord(x){return(x+this.xOffset)}
  ycoord(y){return(this.h-this.yOffset-y)}

  drawAxis(ymin=this.ymin){
    this.ymin = ymin;
    this.ctx.beginPath();
    this.ctx.lineWidth=1;
    // this.ctx.scale(1,-1);
    // this.ctx.translate(this.xOffset, this.yOffset);
    // // this.ctx.moveTo(this.xOffset, this.h-this.yOffset);
    // this.ctx.lineTo(this.xOffset, 0);
    // this.ctx.moveTo(this.xOffset, this.h-this.yOffset);
    // this.ctx.lineTo(this.w, this.h-this.yOffset);
    this.ctx.moveTo(0, 0-this.ymin);
    this.ctx.lineTo(0, this.h-this.ymin);
    this.ctx.moveTo(0, 0-this.ymin);
    this.ctx.lineTo(this.w, 0-this.ymin);
    this.ctx.strokeStyle = "#000000";
    this.ctx.stroke();

  }

  writeAxisText(xLab ="", yLab=""){
    this.ctx.setTransform(this.originalTransform);
    this.ctx.textAlign="end";
    let y=this.h-20;
    this.ctx.fillText(xLab, this.xcoord(this.w-5-this.xOffset), this.ycoord(-20-this.ymin));
    // this.ctx.rotate(-Math.PI/2);
    // this.ctx.fillText(yLab, this.xcoord(-100), this.ycoord(230))
     this.ctx.fillText(yLab, this.xcoord(-5), this.ycoord(this.h-100-this.ymin));
    // this.ctx.rotate(Math.PI/2);
    this.ctx.stroke();
    this.ctx.setTransform(this.coordTransform);
  }

  writeLabel(label=this.lastLine,x,y, align="left", color="black", size=18){
    //align can be "left", "center", "right", "start", "stop"
    this.ctx.setTransform(this.originalTransform);
      this.ctx.textAlign = align;
      let xPrime = this.xcoord(x);
      let yPrime = this.ycoord(y);
      this.ctx.fillStyle = color
      this.ctx.font=size+"px Verdana";
      this.ctx.fillText(label,xPrime,yPrime);
    this.ctx.setTransform(this.coordTransform);

  }

  clearPlot(){
    this.ctx.clearRect(0, 0, this.w-this.xOffset, this.h-this.yOffset);
  }

  clearFullPlot(){
  this.ctx.setTransform(this.originalTransform);
  this.ctx.clearRect(0, 0, this.w, this.h);
  this.ctx.setTransform(this.coordTransform);
}

  drawFunction(baseFunc, x0=0, y0=0, color="#0000ff", linetype=0, linewidth=3){
    let x=x0;
    let y=y0;
    this.ctx.beginPath();
    if(linetype==0){
      this.ctx.setLineDash([]);
    } else if(linetype==1){
      this.ctx.setLineDash([5,5]);
    };
    this.ctx.lineWidth=linewidth;
    this.ctx.moveTo(x,y);
    for (x; x<(this.w-this.xOffset); x+=1){
      y = baseFunc(x);
      this.ctx.lineTo(x,y);
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawInvFunction(baseFunc, x0=0, y0=0, color="#0000ff", linetype=0, linewidth=3){
    let x=x0;
    let y=y0;
    this.ctx.beginPath();
    if(linetype==0){
      this.ctx.setLineDash([]);
    } else if(linetype==1){
      this.ctx.setLineDash([5,5]);
    };
    this.ctx.lineWidth=linewidth;
    this.ctx.moveTo(x,y);
    for (y; y<(this.h-this.yOffset); y+=1){
      x = baseFunc(y);
      this.ctx.lineTo(x,y);
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawArc(x=this.w/2,y=this.h/2,r=100, start=0, stop=.5, color="black", lineWidth=2, lineType=[], fill="no"){
    this.ctx.beginPath();
    let startR = start*Math.PI*2;
    let stopR = stop*Math.PI*2;
    this.ctx.arc(x,y,r,startR,stopR);
    this.ctx.lineWidth=lineWidth;
    this.ctx.setLineDash(lineType);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    if(fill=="yes"){
      this.ctx.fillStyle=color;
      this.ctx.fill();
    }
  }

  drawProdFunc(A=this.A, a=this.a, color="#0000ff"){
    this.A = Number(A);
    this.a= Number(a);
    this.ctx.beginPath();
    this.ctx.lineWidth=3;
    this.ctx.setLineDash([])
    let x = 0;
    let y = 0;
    this.ctx.moveTo(x,y);
    for (x; x<(this.w-this.xOffset); x+=1){
      y = this.A*x**this.a;
      this.ctx.lineTo(x,y);
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawLinSupply(syi=this.syi, ss=this.ss, label="", lineType=0, color="blue"){
    //syi - supply y intercept@
    //ss - supply
    this.lastLine="Supply"
    if(ss<0){
      alert("Supply curve is downward sloping")
    }
    this.syi=Number(syi);
    this.ss=Number(ss);
    this.ctx.beginPath();
    let x0=0;
    let y0=this.syi;
    let x1=400;
    let y1=y0 + this.ss*x1;
    this.drawLine(x0,x1,y0,y1, lineType, color, 3);
    this.writeLabel(label, 30, this.syi + (this.ss*30)+35);
  }

  drawLinDemand(dyi=this.dyi, ds=this.ds, label="", lineType=0, color="green"){
    //dyi - demand y intercept@
    //ss - supply
    this.lastLine="Supply"
    if(ds>0){
      alert("Demand curve is upward sloping")
    }
    this.dyi=Number(dyi);
    this.ds=Number(ds);

    let x0=0;
    let y0=this.dyi;
    let x1=this.w-this.xOffset;
    let y1=y0+this.ds*x1;
    this.drawLine(x0,x1,y0,y1, lineType, color, 3);
    this.writeLabel(label, 30, this.dyi + (this.ss*30)-10);
  }

  drawLine(x0,x1,y0,y1, lineType=0, color="#000000", lineWidth=1){
    this.ctx.beginPath();
    this.ctx.lineWidth=lineWidth;
    if(lineType==1) this.ctx.setLineDash([5,5]);
    else this.ctx.setLineDash([]);
    this.ctx.moveTo(x0,y0);
    this.ctx.lineTo(x1,y1);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawHline(y, maxL=this.w-this.xOffset, lineCol="#000000", lineType=[5,5], lineWidth=1){
    this.ctx.beginPath();
    this.ctx.lineWidth=lineWidth;
    this.ctx.setLineDash(lineType);
    this.ctx.moveTo(0,y);
    this.ctx.lineTo(maxL,y);
    this.ctx.strokeStyle = lineCol;
    this.ctx.stroke();
  }

  drawVline(x, maxH=this.h-this.yOffset, lineCol="#000000"){
    this.ctx.beginPath();
    this.ctx.lineWidth=1;
    this.ctx.setLineDash([5,5]);
    this.ctx.moveTo(x,0-this.ymin);
    this.ctx.lineTo(x,maxH);
    this.ctx.strokeStyle =lineCol;
    this.ctx.stroke();
    }

  drawPoint(x,y, color="#000000"){
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, 2*3.14);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawIntersection(x, y, color="#000000", labels="yes"){
      // Takes an x and y value,
      // and draws an intersection point and lines
      x = Number(x);
      y = Number(y);
      this.drawVline(x, y, color);
      this.drawHline(y, x, color);
      this.drawPoint(x,y);
      let xlab = Math.round(x);
      let ylab = Math.round(y);
      if(labels=="yes"){
        this.writeLabel(xlab,x,-20, "center", "black", 10);
        this.writeLabel(ylab,-20,y, "center", "black", 10);
      }

  }

  drawLinEquil(dyi=this.dyi, syi=this.syi, ds=this.ds, ss=this.ss){
    let xQ = (dyi - syi)/(ss-ds);
    let yQ = dyi + ds*xQ;
    this.drawIntersection(xQ, yQ, "black", "no");
    //this.drawVline(xQ,yQ);
    //this.drawHline(yQ, xQ);
    }

  //For drawing budget lines
  drawBudgetCurve(m=this.m, p1=this.p1, p2=this.p2, lineType=0, ymin=this.ymin){
    this.m =Number(m);
    this.p1=Number(p1);
    this.p2=Number(p2);
    this.ymin=Number(ymin);
    self = this;
    //calculate coordinates for budgett line
    let x0 = 0;
    let y0 = this.m/this.p2;
    let x1 = this.m/this.p1;
    let y1 = 0;
    let color = "#0000ff";
    let lineWidth = 3;
    this.drawLine(x0,x1,y0,y1, lineType, color, lineWidth);
    if (this.ymin>0){
      this.drawLine(x1,x1,y1,y1-this.ymin, lineType, color, lineWidth);
    }
  }

  //for drawing consumption possibility area
  drawConsumPosArea(){
    this.ctx.beginPath();

    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.m/this.p2);
    this.ctx.lineTo(this.m/this.p1, 0);
    this.ctx.lineTo(0, 0)
    //this.ctx.strokeStyle = "#0000ff";
    //this.ctx.stroke();
    this.ctx.fillStyle = 'rgba(173,216,230,.5)';
    this.ctx.fill();
    this.ctx.closePath()
  }

  drawTriangle(x0, x1, x2, y0, y1, y2, rgbcol='rgba(173,216,230,.5)'){
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x0, y0)
    //this.ctx.strokeStyle = "#0000ff";
    //this.ctx.stroke();
    this.ctx.fillStyle = rgbcol;
    this.ctx.fill();
    this.ctx.closePath()
  }

  drawQuad(x0, x1, x2, x3, y0, y1, y2, y3, rgbcol='rgba(173,216,230,.5)'){
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.lineTo(x0, y0);
    //this.ctx.strokeStyle = "#0000ff";
    //this.ctx.stroke();
    this.ctx.fillStyle = rgbcol;
    this.ctx.fill();
    this.ctx.closePath()
  }

  indifferenceFunction(x){
    return((self.U/(self.A*(x+self.xshift)**self.a))**(1/self.b));
  }

  //cobb-douglas utility function
  utilityFunction(x1, x2){
    return(self.A*x1**self.a*x2**self.b)
  }

  //Quasi-linear function
  indifferenceFunctionQL(x){
    return((self.U-self.A*(x)**self.a)**(1/self.b));
  }

  //draw indifference curve

  drawIndifferenceCurve(a=this.a, U=this.U, A=this.A, b=this.b, indiffFunc = this.indiffFunc, color="#FF6347", xshift=this.xshift){
    this.a=Number(a);
    this.b=Number(b);
    this.A=Number(A);
    this.U = Number(U);
    this.indiffFunc = indiffFunc;
    this.xshift=xshift;
    self = this;

    let baseFunction = this.indifferenceFunction;
    if(this.indiffFunc=="ql"){
      baseFunction = this.indifferenceFunctionQL;
    }

    //Letting y be x2, we write the following function
    //y(x1) = U/(x1^a)
    //starting points
    let x = 40-this.xshift;
    let y = baseFunction(x);
    this.ctx.setLineDash([]);
    this.ctx.lineWidth=2;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    for ((x); x<(this.w-this.xOffset-140-this.xshift); x+=1){
      y=baseFunction(x);
      this.ctx.lineTo(x,y);
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  findSlope(x, baseFunction){
    let y_plus1 = baseFunction(x+1);
    let y_minus1 = baseFunction(x-1);
    let s = (y_plus1 - y_minus1)/(2);
    return(s);
  }

  drawTangeant(x, baseFunction, length=80, color="#228B22", lineWidth=1){
    x = Number(x);
    let y = baseFunction(x);
    let s = this.findSlope(x, baseFunction);
    length = Math.min(length, x);
    let x0 = x-length;
    let x1 = x+length;
    let y0 = y-length*s;
    let y1 = y+length*s;
    this.drawLine(x0, x1, y0, y1, 1, color, lineWidth);
  }

  reDrawConsume(consumPosArea=true){
    this.clearPlot();
    this.drawBudgetCurve();
    if(consumPosArea) this.drawConsumPosArea();
    this.drawIndifferenceCurve();
  }

  bisectionMethod(start, end, foe){
    // bisection method
    // start as starting point
    // end as ending point of range
    // foe - function representing first-order equation with zero as stationary point.

    let x = (end+start)/2;
    while(Math.abs(foe(x))>.1){
    // while (Math.abs(foe)>.1){
      if((foe(start)*foe(x))<0){
        end = x;
      } else if((foe(end)*foe(x))<0){
        start=x;
      } else {
        console.log("Failure to find optimum")
        break;
      }
      x = (end+start)/2;
    }
    return(x);
  }

  findOptimalConsQL(a=this.a, A=this.A, b=this.b, xshift=this.xshift){
    this.a=a;
    this.b=b;
    this.A=A;
    this.xshift=xshift;
    self = this;
    let start = 1;
    let end = this.m/this.p1;

    function yfunc(x){return((((self.p2*self.A*self.a)/(self.p1*self.b))*x**(self.a-1))**(1/(self.b-1)))};

    function foe(x){
      function yfunc(x){return((((self.p2*self.A*self.a)/(self.p1*self.b))*x**(self.a-1))**(1/(self.b-1)))};
      // let y = (((self.p2*self.A*self.a)/(self.p1*self.b))*x**(a-1))**(self.b-1);
      // console.log([self.A, self.a, self.b])
      return(self.p1*x + self.p2*yfunc(x) - self.m);
    }

    let x1_star= this.bisectionMethod(start, end, foe);
    let x2_star= yfunc(x1_star);
    this.U = this.A*x1_star**this.a + x2_star**this.b;
    this.indiffFunc = "ql";
    self=this;
    return({"x1_star": x1_star, "x2_star":x2_star});
  }


  findOptimalCons(a=this.a, A=this.A, b=this.b, indiffFunc=this.indiffFunc, xshift=this.xshift){
    this.a=a;
    this.b=b;
    this.A=A;
    this.indiffFunc = indiffFunc;
    this.xshift=xshift;
    self = this;

    //new version
    //let x1_star = (this.m)/(this.p1 + this.p1*(this.b/this.a));
    let x1_star = (this.a)/(this.a+this.b)*(this.m/this.p1-this.b/this.a*this.xshift);
    let x2_star = (this.p1/this.p2)*(this.b/this.a)*(x1_star+this.xshift);
    this.U = this.utilityFunction(x1_star+this.xshift, x2_star);
    self = this;
    return({"x1_star": x1_star, "x2_star":x2_star})
   }

   compensatingM(Ui){
     let start = 1;
     let end = this.w-this.xOffset;
     let x = this.bisectionMethod(start, end, x=>{return(this.A*x**(this.a)*((this.p1/this.p2)*(this.b/this.a)*x)**(this.b)-Ui)})
     let y = (this.p1/this.p2)*(this.b/this.a)*x;
     let m_c = this.p1*x + this.p2*y;
     return({"x1_star":x, "x2_star":y, "m_c":m_c});
   }

   compensatingM_QL(Ui){
     let start = 1;
     let end = this.w-this.xOffset;
     let x = this.bisectionMethod(start, end, x=>{return((this.A*x**(this.a) + ( ((this.p2*this.A*this.a)/(this.p1*this.b))*x**(this.a-1) )**(this.b/(this.b-1)))-Ui)})
     let y = (((this.p2*this.A*this.a)/(this.p1*this.b))*x**(this.a-1))**(1/(this.b-1));
     let m_c = this.p1*x + this.p2*y;
     return({"x1_star":x, "x2_star":y, "m_c":m_c});
   }

}




// Class Quiz

class quiz{
  constructor(quizID, resID, questions){
    this.quizContainer = document.getElementById(quizID);
    this.resultsContainer = document.getElementById(resID);
    this.questions = questions;
    this.output = [];

    this.showQuestions();
    this.createButton();

    //this.showResults();
  }

  createButton(){
    this.button = document.createElement('button');
    this.button.innerHTML="Check answers";
    this.button.addEventListener('click', e=>{this.showResults();});
    this.quizContainer.appendChild(this.button);
  }

  showQuestions(){
  	// we'll need a place to store the output and the answer choices
    let answers;
  	// for each question...
  	for(var i=0; i<this.questions.length; i++){

  		// first reset the list of answers
  		answers = [];

  		// for each available answer to this question...
  		for(let letter in this.questions[i].answers){
  			// ...add an html radio button
  			answers.push(
  				'<label>'
  					+ '<input type="radio" name="question'+i+'"value="'+letter+'">'
  					+ ' ' + this.questions[i].answers[letter] + ' '
  				+ '</label>'
  			);
  		}

  		// add this question and its answers to the output
  		this.output.push(
  			'<div class="question">' + this.questions[i].question + '</div>'
  			+ '<div class="answers">' + answers.join('   ') + '</div>'
  		);
  	}

    //this.output.push('<button id="submit">Get Results</button>')

  	// finally combine our output list into one string of html and put it on the page
  	this.quizContainer.innerHTML = this.output.join('');
  }

    showResults(){
    	// gather answer containers from our quiz
    	let answerContainers = this.quizContainer.querySelectorAll('.answers');

    	// keep track of user's answers
    	let userAnswer = '';
    	let numCorrect = 0;

    	// for each question...
    	for(var i=0; i<this.questions.length; i++){

    		// find selected answer
    		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

    		// if answer is correct
    		if(userAnswer===this.questions[i].correctAnswer){
    			// add to the number of correct answers
    			numCorrect++;

    			// color the answers green
    			answerContainers[i].style.color = 'lightgreen';
    		}
    		// if answer is wrong or blank
    		else{
    			// color the answers red
    			answerContainers[i].style.color = 'red';
    		}
    	}

    	// show number of correct answers out of total
    	this.resultsContainer.innerHTML = numCorrect + ' av ' + this.questions.length;
    }
}

//For removing the class "svar" indication, and thereby making visible
function visSvar(id){
document.getElementById(id).classList.remove('svar');
document.getElementById(id).classList.add('svar_vis');
}

//Other individual functions:
function equilQuant(yi, b, p){
//This function returns the quantity given the price from a linear equation
  return(Math.max(((p-yi)/b),0));
}

function aggb(b1, b2){
  //This function returns the aggregated slope when summing over demand or supply curves
  return((b1*b2)/(b1+b2))
}

function aggYi(yi1, yi2, b1, b2){
  //This function returns the aggregated y intercept when summing over demand or supply curves
  return((b2/(b1+b2))*yi1 + (b1/(b1+b2))*yi2)
}

function insertAnswer(divID, y, dec=2){
  yDiv = document.getElementById(divID);
  //yA = document.createTextNode(y);
  y=Number.parseFloat(y).toFixed(dec);
  yDiv.textContent += y;
}

function findLinEquil(dyi, syi, ds, ss){
  let xQ = (dyi - syi)/(ss-ds);
  let yQ = dyi + ds*xQ;
  return({"xQ":xQ, "yQ":yQ});
  }
