/*
  Blink by AA00
  Turns an LED on for one second, then off for one second, repeatedly.
*/

int pinNum = 13;  // D13

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin 13 as an output.
  pinMode(pinNum, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(pinNum, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(pinNum, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
