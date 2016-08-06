package main
import (
	"fmt"
	"time"

	"math"
)
type I interface {
	M()
}
type MyFloat float64
type Vertex struct{
	X,Y float64
}
func (f MyFloat) M() {
	fmt.Println("method of MyFloat")
}
func (v *Vertex) M(){
	fmt.Println("method of Vertext")
}

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string{
	return fmt.Sprintf("age : %v - name : %v",p.Age,p.Name)
}
type IPAddr [4]byte

func (ip IPAddr) String() string{
	return fmt.Sprintf("%v.%v.%v.%v", ip[0],ip[1],ip[2],ip[3])
}
type MyError struct{
	When time.Time
	What string
}
func (err *MyError) Error() string{
	return fmt.Sprintf("at %v, %s", err.When, err.What)
}
func run() error{
	err := MyError{
		time.Now(),
		"i didnot work",
	}
	return &err
}

type ErrNegativeSqrt float64
func (err ErrNegativeSqrt) Error() string{
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(err))
}
func Sqrt(f float64) (float64, error){
	if f < 0 {
		return 0, ErrNegativeSqrt(f)
	}else{
		return math.Sqrt(f), nil
	}
}

func fibonacci() func() int {
	x := 0
	y := 1
	return func() int{
		x , y = y, x + y
		return x
	}
}

func main() {

	//f := fibonacci()
	//for i := 0; i < 10; i++{
	//	fmt.Println(f())
	//}

	//hosts := map[string]IPAddr{
	//	"home" : {127, 0, 0, 1},
	//	"school" : {192, 2, 2, 8},
	//}
	//
	//for key, value := range hosts{
	//	fmt.Printf("%v - %v\n", key, value)
	//}
	//
	err := run()
	if err != nil{
		fmt.Println(err)
	}
	fmt.Println("test error")
	//
	//fmt.Println(Sqrt(2))
	//fmt.Println(Sqrt(-2))
	//s := []int{2, 3, 5, 7, 11, 13}
	//printSlice(s)
	//
	//// Slice the slice to give it zero length.
	//s = s[:0]
	//printSlice(s)
	//
	//// Extend its length.
	//s = s[:4]
	//printSlice(s)
	//
	//// Drop its first two values.
	//s = s[2:]
	//printSlice(s)
	//
	//result := make([][]uint8, 3)
	//for i := 0; i < 3; i++ {
	//	result[i] = make([]uint8,8)
	//	for j := 0; j < 8; j++ {
	//		result[i][j] = uint8(i * j)
	//	}
	//}
	//fmt.Println("2d: ", result)
	//
	//fmt.Println("finished configure")
	//fmt.Println("")




}
func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func describe ( i interface{}){
	fmt.Printf("(%v - %T)\n", i , i)
	//fmt.Printf("(%v, %T)\n", i, i)
}
