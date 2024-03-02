class Parent:
    def __init__(self):
        self.name = "Anton"
    def show(self):
        print("Parent name is", self.name)


class Child(Parent):
    def __init__(self):
        super().__init__()
    def show(self):
        print("Child name is", self.name)

c = Child()
c.show()