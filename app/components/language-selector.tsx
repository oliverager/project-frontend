"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const languages = [
  { value: "danish", label: "Danish" },
  { value: "english", label: "English" },
  { value: "dutch", label: "Dutch" },
  { value: "french", label: "French" },
  { value: "russian", label: "Russian" },
  { value: "german", label: "German" },
  { value: "spanish", label: "Spanish" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "chinese", label: "Chinese" },
]

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [hallo, setHallo] = useState("")
  const [planet, setPlanet] = useState("")

  useEffect(() => {
    const fetchLanguageData = async () => {
      if (selectedLanguage) {
        try {
          const response = await fetch(`http://localhost:3000/language/${selectedLanguage}`)
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          const data = await response.json()
          setHallo(data.hallo)
          setPlanet(data.planet)
        } catch (error) {
          console.error("Error fetching language data:", error)
          setHallo("")
          setPlanet("")
        }
      }
    }

    fetchLanguageData()
  }, [selectedLanguage])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedLanguage && (
        <Card>
          <CardHeader>
            <CardTitle>Language: {selectedLanguage}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Hallo:</strong> {hallo}
            </p>
            <p>
              <strong>Planet:</strong> {planet}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

