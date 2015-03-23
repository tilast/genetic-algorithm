#!/usr/bin/python

# print "Hello Evolution"

import random

def getProb(min, max, range, amount):
	return (max - min) * (1.0 / range) * (1.0 / amount)

def getRandom(min, max):
	return min + random.random() * (max - min)

def sutulaMethodSelection(distances):
	distances = sorted(distances)
	size = len(distances)
	dist_range = distances[-1] - distances[0]

	probs = []

	for i in range(size):
		prob = 0
		for j in range(i + 1, size):
			prob += getProb(distances[j-1], distances[j], dist_range, j)
		probs.append(prob)

	return probs

def bruteForceReciprocalMethod(distances):
	distances = sorted(distances)
	size = len(distances)
	# dist_range = distances[-1] - distances[0]
	probs_src = [1.0 / distances[i] for i in range(size)]

	# koef = 1.0 / sum(probs_src)

	# probs = [koef * probs_src[i] for i in range(size)]
	probs = normalize(probs_src);

	return probs

def bruteForceReciprocalMethod_v2(distances):
	distances = sorted(distances)
	size = len(distances)
	# dist_range = distances[-1] - distances[0]
	probs_src = [1.0 / distances[i] for i in range(size)]

	# koef = 1.0 / sum(probs_src)

	# probs = [koef * probs_src[i] for i in range(size)]
	probs = normalize(probs_src);

	return probs



def krooshMethodSelection(distances):
	distances = sorted(distances)
	max_el = 1.0 * distances[-1]
	size = len(distances)
	# dist_range = distances[-1] - distances[0]
	probs_src = [1.0 - (distances[i] / max_el) for i in range(size)]

	# koef = 1.0 / sum(probs_src)

	# probs = [koef * probs_src[i] for i in range(size)]
	probs = normalize(probs_src)

	return probs

def normalize(probs_src):
	koef = 1.0 / sum(probs_src)
	probs = [koef * probs_src[i] for i in range(len(probs_src))]
	return probs

def printList(list):
	for item in list:
		print item

def main():
	random.seed(147)

	distances = [50, 60, 70, 80, 90, 100]

	probs_1 = sutulaMethodSelection(distances)
	probs_2 = bruteForceReciprocalMethod(distances)
	probs_3	= krooshMethodSelection(distances)

	print "Distances: "
	print distances
	print "\n"

	print "SutulaMethodSelection: "
	# print probs_1
	printList(probs_1)
	print "sum: " + str(sum(probs_1))
	print ""
	print "BruteForceReciprocalMethod: "
	# print probs_2
	printList(probs_2)
	print "sum: " + str(sum(probs_2))
	print ""
	print "KrooshMethodSelection: "
	# print probs_3
	printList(probs_3)
	print "sum: " + str(sum(probs_3))

if __name__ == '__main__':
	main()