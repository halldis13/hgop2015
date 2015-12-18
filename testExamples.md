-------Failures--------------
Given[]
When[Placed(0,3,X)]
Then[Failure: Illegal Move]

Given[Placed(0,0,X)]
When[Placed(0,0,O]
Then[Failure: Illegal Move]

-------Winning Scenarios-----

Given[Placed(0,0,X),Placed(1,1,X)]
When[Placed(2,2,X)]
Then[X Won]

Given[Placed(0,0,X),Placed(0,1,X)]
When[Placed(0,2,X)]
Then[X Won]

Given[Placed(0,0,X),Placed(1,0,X)]
When[Placed(2,0,X)]
Then[X Won]

-------Draw scenarios--------

XXO
OOX
XOX

Given[Placed(0,0,X),Placed(1,0,X),Placed(2,0,O),Placed(0,1,O),Placed(1,1,O),Placed(2,1,X),Placed(0,2,X),Placed(1,2,O)]
When[Placed(2,2,O)]
Then[Draw]

XOX
OOX
OXO

Given[Placed(0,0,X),Placed(1,0,O),Placed(2,0,X),Placed(0,1,O),Placed(1,1,O),Placed(2,1,X),Placed(0,2,O),Placed(1,2,X)]
When[Placed(2,2,O)]
Then[Draw]

OOX
XXO
OXX

Given[Placed(0,0,O),Placed(1,0,O),Placed(2,0,X),Placed(0,1,X),Placed(1,1,X),Placed(2,1,O),Placed(0,2,O),Placed(1,2,X)]
When[Placed(2,2,X)]
Then[Draw]
