def count_and_convert_vowels(input_string):
    vowels = 'aeiouAEIOU'
    count = 0
    result = ""

    for char in input_string:
        if char in vowels:
            count += 1
            result += char.upper()
        else:
            result += char

    return count, result

input_string = "Hello, World!"
num_vowels, modified_string = count_and_convert_vowels(input_string)
print(num_vowels)
print(modified_string)
