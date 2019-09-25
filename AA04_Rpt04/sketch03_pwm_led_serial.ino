int pwm=0;
int led =3;


void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
pwm=random(0,255);
pwmLed(led,pwm);

Serial.print("aa04 ,LED: ");
Serial.println(pwm);
delay(10);


}
void pwmLed(int led,int pwmValue){

analogWrite(led,pwmValue);
delay(10);
  
}
