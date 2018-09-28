class Human {
	constructor(id) {
		this.id = id;
		this.DNA = [];
		this.p_to_s = 0;
		this.score = 0;
		this.num_of_DNA = test_case[0].length - 1;
		let self = this;
		this.random(()=>{
			self.test(() => {
				self.update_html();
			});
		});
	}

	random (callback) {
		this.p_to_s = Math.round(Math.random() * 1000)/ 100;
		for (let i = 0; i < this.num_of_DNA ; i++) {
			this.DNA[i] = Math.round(Math.random() * 100) / 100;
			if (i == this.num_of_DNA - 1 ) callback();
		}
	}

	mutation () {
		let self = this;
		if (Math.random() < mutation_rate) {
			let DNA_random = Math.round(Math.random()*8);
			this.DNA[DNA_random] = Math.round(Math.random() * 100) / 100;
			if (Math.random() > 0.5 ) {
				this.p_to_s = Math.round(Math.random() * 1000)/ 100;
			}
			self.test(() => {
				self.update_html();
			});
		}
	}

	crossover (DNA1,DNA2,p2s1,p2s2) {
		let self = this;
		cross(DNA1,DNA2,p2s1,p2s2,()=>{
			self.test(() => {
				self.update_html();
			});
		});
		
		function cross (DNA1,DNA2,p2s1,p2s2,callback){
			for (let i = 0; i < self.num_of_DNA ; i++) {
				if (i % 2) {
					self.DNA[i] = DNA1[i];
				}else{
					self.DNA[i] = DNA2[i];
				}
				self.p_to_s =  (Math.random() > 0.5 )? p2s1:p2s2;
				if (i == self.num_of_DNA - 1 ) callback();
			}
		}
	}

	test (callback) {
		this.score = 0;
		//this.is_pass = [];
		let self = this;
		for (var i = 0; i < test_case.length ; i++) {
			this.test_one_case( test_case[i],(result)=>{

				//this.is_pass[i] = result;

				if (result) 
					this.score = this.score + 1;
				
				if( i == test_case.length - 1)
					callback();
			});
		}
	}

	test_one_case (tCase,callback) {
		let sum = 0; let string = "";
		for (let i = 0; i < this.num_of_DNA ; i++) {
			sum += this.DNA[i]*tCase[i];
			// string += ("+ (" + this.DNA[i] + "*" +  tCase[i] + ") " );
			if (i == this.num_of_DNA - 1 ) {

				// string += ( "= " + sum + " > " + this.p_to_s + (sum > this.p_to_s) + tCase[this.num_of_DNA] );
				// console.log(string);
				
				if( (sum > this.p_to_s ) == tCase[this.num_of_DNA] ){
					callback(1);
				}else {
					callback(0);
				}
			}
		}
	}

	update_html () {
		let t = document.getElementById('human_'+this.id);

		t.children[0].innerHTML = this.id;
		t.children[1].innerHTML = this.score;
		t.children[2].innerHTML = this.DNA;
		t.children[3].innerHTML = this.p_to_s;
	}

	die(){}
}