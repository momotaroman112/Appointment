package main

import (
	"github.com/gin-gonic/gin"
	"github.com/momotaroman112/Appointment/controller"
	"github.com/momotaroman112/Appointment/entity"
	"github.com/momotaroman112/Appointment/middlewares"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// user Routes
			protected.GET("/employees", controller.ListEmployees)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.GET("/employeerole/:roleid", controller.GetEmployeerole)
			protected.PATCH("/emplotees", controller.UpdateEmployee)
			protected.DELETE("/emplotees/:id", controller.DeleteEmployee)

			// role Routes
			protected.GET("/roles", controller.ListRoles)
			protected.GET("/role/:id", controller.GetRole)

			// patientType Routes
			protected.GET("/patienttypes", controller.ListPatientType)
			protected.GET("/patienttype/:id", controller.GetPatientType)

			// gender Routes
			protected.GET("/genders", controller.ListGenders)
			protected.GET("/gender/:id", controller.GetGender)

			// Appointment Routes
			protected.GET("/appointments", controller.ListAppointments)
			protected.GET("/appointment/:id", controller.GetAppointment)
			protected.POST("/appointments", controller.CreateAppointment)
			protected.PATCH("/appointments", controller.UpdateAppointment)
			protected.DELETE("/appointments/:id", controller.DeleteAppointment)

			// Clinic Routes
			protected.GET("/clinics", controller.ListClinics)
			protected.GET("/clinic/:id", controller.GetClinic)
			protected.POST("/clinics", controller.CreateClinics)
			protected.PATCH("/clinics", controller.UpdateClinic)
			protected.DELETE("/clinics/:id", controller.DeleteClinics)

			// ClinicLog Routes
			protected.GET("/cliniclogs", controller.ListCliniclogs)
			protected.GET("/cliniclog/:id", controller.GetClinicLog)
			protected.POST("/cliniclogs", controller.CreateClinicLogs)
			protected.PATCH("/cliniclogs", controller.UpdateClinicLog)
			protected.DELETE("/cliniclogs/:id", controller.DeleteClinicLog)



		}
	}
	// User Routes
	r.POST("/employees", controller.CreateEmployee)
	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
