import math
print(math.pi)
print(math.floor(math.pi))
print(math.ceil(math.pi))
print(round(math.pi))
print(math.sqrt(4))
print(4**0.5)
print(math.sin(90))
print(math.sin(math.radians(90)))


#homework

userhour = 3.5
inthour = int(userhour)
minhour = userhour - inthour
minutes = minhour * 60

# functions

def functionName():
    print("Hello")
    name = input("What's your name?")
    print("Good to see you!", name, "bye")

a = 10
print(a) # Call a print function
print()
functionName() # Call a function


def aa(x): # x is a parameter
    print(x)
aa(a) # a is an argument

def rectangleArea(w, l):
    area = w * l
    print("your area of a rectangle is", area)

rectangleArea(3, 4)
