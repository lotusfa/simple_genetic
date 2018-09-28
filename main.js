let population;
let mutation_rate;
let crossover_rate;
let copy_rate;
let test_case;
let humans;
let stage = 0;
let auto = 0;
let auto_timer;
init();

function init () {
  get_traning_set () ;
  initiator_mode ();
}

function get_traning_set () {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          population = myObj.population;
          mutation_rate = myObj.mutation_rate;
          crossover_rate = myObj.crossover_rate;
          copy_rate = myObj.copy_rate;
          test_case = myObj.data;
          init_input_value ();
          return myObj;
      }
  };

  xmlhttp.open("GET", "./training_set.json", true);
  xmlhttp.send();
}

function init_input_value () {
  document.getElementById('population').value = population;
  document.getElementById('mutation_rate').value = mutation_rate;
  document.getElementById('crossover_rate').value = crossover_rate;
  document.getElementById('test_case').value = JSON.stringify(test_case);
}

function update_value () {
  population = document.getElementById('population').value;
  mutation_rate = document.getElementById('mutation_rate').value;
  crossover_rate = document.getElementById('crossover_rate').value;
  test_case = JSON.parse(document.getElementById('test_case').value);

  document.getElementById('p_tag').innerHTML = population;
  document.getElementById('m_tag').innerHTML = mutation_rate;
  document.getElementById('cr_tag').innerHTML = crossover_rate;
}

function run_simulation () {
  update_value ();
  simulator_mode ();
  humans = new Humans(population);
}

function stop_simulation () {
  initiator_mode ();
  if (auto == 1) {
      auto = 0;
      clearInterval(auto_timer);
      document.getElementById("auto_button").innerHTML = "Auto";
    }
}

function initiator_mode () {
    document.getElementById("initiator").style.display = "block";
    document.getElementById("simulator").style.display = "none";
}

function simulator_mode () {
    document.getElementById("initiator").style.display = "none";
    document.getElementById("simulator").style.display = "block";
}

function auto_train () {
  if (auto == 0) {
    auto = 1;
    let mss = document.getElementById('auto_time').value;
    auto_timer =  setInterval(function(){ 
      button_click ()
    }, mss);
    document.getElementById("auto_button").innerHTML = "Manu";
  }else if (auto == 1) {
    auto = 0;
    clearInterval(auto_timer);
    document.getElementById("auto_button").innerHTML = "Auto";
  }
}

function button_click () {
  if (stage == 0) {
    stage = 1;
    humans.sort ();
    document.getElementById("super_button").innerHTML = "Next";
  }else if (stage == 1) {
    stage = 0;
    humans.nextGeneration ();
    document.getElementById("super_button").innerHTML = "Sort";
  }
}




