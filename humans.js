class Humans {
	constructor(numOfHumans) {
		this.numOfHumans = numOfHumans;
		this.humans = [];
		this.generation = 0;
		this.init_html();

		for (let i = 0; i < this.numOfHumans ; i++) { 
			this.humans[i] = new Human(i);
		}
	}

	init_html () {
		let r = document.getElementById('result');
		r.innerHTML = "";

		for (let i = 0; i < this.numOfHumans ; i++) { 
			let t = document.createElement("tr");
			let t1 = document.createElement("td");
			let t2 = document.createElement("td");
			let t3 = document.createElement("td");
			let t4 = document.createElement("td");

			t.appendChild(t1);
			t.appendChild(t2);
			t.appendChild(t3);
			t.appendChild(t4);
			
			t.id = "human_" + i;

			r.appendChild(t);
		}
	}

	sort () {
		this.humans.sort((a, b)=>{
		    return b.score - a.score;
		});

		for (let i = 0; i < this.numOfHumans ; i++) { 
			this.humans[i].id = i;
			this.humans[i].update_html ();
		}
		document.getElementById('so_tag').innerHTML = this.humans[0].score+"/"+test_case.length;
	}

	nextGeneration () {
		this.generation++;
		document.getElementById('gen_tag').innerHTML = this.generation;

		let self = this;
		this.big_random_numbers(this.numOfHumans*crossover_rate,this.numOfHumans - 1,(die_list)=>{
			
			for (let i = 0; i < self.numOfHumans ; i++) { 

				if ( die_list.includes(i) ) {

					random_not_inlist(self.numOfHumans - 1,die_list,(mum)=>{

						random_not_inlist(self.numOfHumans - 1,die_list,(dad)=>{
							//console.log("mumdad",mum,dad,"die_list",die_list);

							let DNA1 = self.humans[mum].DNA;
							let DNA2 = self.humans[dad].DNA;
							let p2s1 = self.humans[mum].p_to_s;
							let p2s2 = self.humans[dad].p_to_s;

							//console.log(mum,dad,DNA1,DNA2,p2s1,p2s2);
							self.humans[i].crossover (DNA1,DNA2,p2s1,p2s2);
						});
					});
				}
			}
		});

		function random_not_inlist (max,list,callback) {
			let ran;
			do {
				ran = Math.round(Math.random() * max);
				if ( !list.includes(ran) ) {
					callback(ran);
				}
			}while ( list.includes(ran) )
		}

		for (let i = 0; i < self.numOfHumans ; i++) {
			this.humans[i].mutation();
		}
	}

	big_random_numbers (n,m,callback) {
		let numbers = [];
		while ( numbers.length < n) {
			this.big_random_number( (r) => {
				r = Math.round(r * m);
				if ( !numbers.includes(r) ) {
					numbers.push(r);
					if (numbers.length >= n) {
						callback(numbers.sort((a,b)=>{return a - b}));
					}
				}
			});
		}
	}

	big_random_number (callback) {
		let x = Math.random();
		let y = Math.random();
		let self = this;
		if ( (x + y) > 1 ) 
			self.big_random_number( (o_o) =>{
				callback(o_o);
			});
		else callback( x + y);
	}

	die(){
	}
}
