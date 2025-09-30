"use client";

import { useState } from "react";
import CourseCard from "./course-card";
import type { courses as allCoursesData } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Course = (typeof allCoursesData)[0];

export default function CourseList({ allCourses }: { allCourses: Course[] }) {
  const [subject, setSubject] = useState("all");
  const [grade, setGrade] = useState("all");

  const subjects = ["all", ...Array.from(new Set(allCourses.map(c => c.subject)))];
  const grades = ["all", ...Array.from(new Set(allCourses.map(c => c.grade)))];

  const filteredCourses = allCourses.filter(course => {
    return (
      (subject === "all" || course.subject === subject) &&
      (grade === "all" || course.grade === grade)
    );
  });

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(s => (
              <SelectItem key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            {grades.map(g => (
              <SelectItem key={g} value={g}>{g === 'all' ? 'All Grades' : `Grades ${g}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="md:col-span-3 text-center text-muted-foreground">No courses match the selected filters.</p>
        )}
      </div>
    </div>
  );
}
